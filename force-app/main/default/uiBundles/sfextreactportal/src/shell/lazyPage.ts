import type { ComponentType } from "react";
import type { RouteObject } from "react-router";

/**
 * Loads a page on first visit, so each module ships as its own chunk.
 *
 * @example
 * { path: "search", lazy: lazyPage(() => import("./pages/SearchPage")) }
 */
export function lazyPage(
	load: () => Promise<{ default: ComponentType }>,
): NonNullable<RouteObject["lazy"]> {
	return async () => ({ Component: (await load()).default });
}
