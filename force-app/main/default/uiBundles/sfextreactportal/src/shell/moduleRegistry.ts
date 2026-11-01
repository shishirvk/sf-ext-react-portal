import type { RouteObject } from "react-router";
import type { PortalModule } from "./moduleContract";

const collectPaths = (routes: RouteObject[] = []): string[] =>
	routes.flatMap((route) => [
		...(route.index ? ["<index>"] : route.path ? [route.path] : []),
		...collectPaths(route.children),
	]);

/**
 * Sorts modules and rejects conflicts, so a clash between two teams fails the
 * build and tests instead of silently shadowing a route in production.
 */
export function resolveModules(modules: PortalModule[]): PortalModule[] {
	const ids = new Set<string>();
	const paths = new Map<string, string>();

	for (const module of modules) {
		if (ids.has(module.id)) {
			throw new Error(`Duplicate portal module id "${module.id}"`);
		}
		ids.add(module.id);

		for (const path of collectPaths([
			...(module.publicRoutes ?? []),
			...(module.privateRoutes ?? []),
		])) {
			const claimedBy = paths.get(path);
			if (claimedBy) {
				throw new Error(
					`Route "${path}" is declared by both "${claimedBy}" and "${module.id}"`,
				);
			}
			paths.set(path, module.id);
		}
	}

	return [...modules].sort((a, b) => a.order - b.order);
}

const discovered = import.meta.glob<{ default: PortalModule }>("../modules/*/index.ts", {
	eager: true,
});

export const portalModules = resolveModules(Object.values(discovered).map((m) => m.default));

export const publicModuleRoutes = portalModules.flatMap((m) => m.publicRoutes ?? []);
export const privateModuleRoutes = portalModules.flatMap((m) => m.privateRoutes ?? []);
