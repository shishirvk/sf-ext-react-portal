import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = resolve(process.cwd(), "src");
const MODULES = join(SRC, "modules");

/** Shell internals modules must not reach into. The contract and lazyPage are allowed. */
const FORBIDDEN_FOR_MODULES = ["routes", "appLayout", "router-utils", "shell/moduleRegistry"];

const sourceFiles = (dir: string): string[] =>
	readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return sourceFiles(path);
		return /\.tsx?$/.test(name) ? [path] : [];
	});

const importsOf = (file: string): string[] =>
	[
		...readFileSync(file, "utf8").matchAll(
			/(?:from\s+|import\s*\(\s*|^\s*import\s+)["']([^"']+)["']/gm,
		),
	].map((match) => match[1].split("?")[0]);

/** Returns the import as a path relative to src, or null for a package import. */
const toSrcPath = (specifier: string, fromFile: string): string | null => {
	if (specifier.startsWith("@/")) return specifier.slice(2);
	if (specifier.startsWith(".")) {
		return relative(SRC, resolve(dirname(fromFile), specifier)).split(sep).join("/");
	}
	return null;
};

const moduleOf = (srcPath: string) => /^modules\/([^/]+)/.exec(srcPath)?.[1];
const isPublicApi = (srcPath: string) => /^modules\/[^/]+\/public$/.test(srcPath);

const findViolations = (): string[] =>
	sourceFiles(SRC).flatMap((file) => {
		const fromPath = relative(SRC, file).split(sep).join("/");
		if (fromPath.startsWith("shell/__tests__/")) return [];
		const fromModule = moduleOf(fromPath);

		return importsOf(file).flatMap((specifier) => {
			const target = toSrcPath(specifier, file);
			if (!target) return [];

			const targetModule = moduleOf(target);
			if (targetModule && targetModule !== fromModule && !isPublicApi(target)) {
				return [`${fromPath} -> ${specifier} (use modules/${targetModule}/public)`];
			}
			if (fromModule && FORBIDDEN_FOR_MODULES.includes(target.replace(/\.tsx?$/, ""))) {
				return [`${fromPath} -> ${specifier} (shell internal)`];
			}
			return [];
		});
	});

describe("module boundaries", () => {
	it("only crosses module boundaries through public.ts", () => {
		expect(findViolations()).toEqual([]);
	});

	it("gives every module a manifest", () => {
		for (const name of readdirSync(MODULES)) {
			expect(statSync(join(MODULES, name, "index.ts")).isFile()).toBe(true);
		}
	});
});
