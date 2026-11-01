import { describe, expect, it } from "vitest";
import type { PortalModule } from "../moduleContract";
import { portalModules, resolveModules } from "../moduleRegistry";

const moduleWith = (id: string, order: number, path: string): PortalModule => ({
	id,
	owner: "team",
	order,
	publicRoutes: [{ path }],
});

describe("resolveModules", () => {
	it("sorts modules by order", () => {
		const resolved = resolveModules([moduleWith("b", 2, "b"), moduleWith("a", 1, "a")]);
		expect(resolved.map((m) => m.id)).toEqual(["a", "b"]);
	});

	it("rejects duplicate module ids", () => {
		expect(() => resolveModules([moduleWith("a", 1, "x"), moduleWith("a", 2, "y")])).toThrow(
			'Duplicate portal module id "a"',
		);
	});

	it("rejects two modules claiming the same route", () => {
		expect(() => resolveModules([moduleWith("a", 1, "x"), moduleWith("b", 2, "x")])).toThrow(
			'Route "x" is declared by both "a" and "b"',
		);
	});
});

describe("portalModules", () => {
	it("discovers every module in navigation order", () => {
		expect(portalModules.map((m) => m.id)).toEqual([
			"home",
			"identity",
			"search",
			"chat",
			"accounts",
		]);
	});

	it("gives every module an owner", () => {
		for (const module of portalModules) expect(module.owner).toBeTruthy();
	});

	it("keeps profile pages behind the auth guard", () => {
		const identity = portalModules.find((m) => m.id === "identity");
		expect(identity?.privateRoutes?.length).toBe(2);
	});
});
