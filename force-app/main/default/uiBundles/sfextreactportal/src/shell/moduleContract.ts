import type { RouteObject } from "react-router";

/**
 * The contract between the shell and a feature module.
 *
 * Each `src/modules/<id>/index.ts` default-exports one of these. The shell finds
 * it automatically, so adding a module requires no change to shell code.
 */
export interface PortalModule {
	/** Unique id. Must match the module's folder name. */
	id: string;
	/** Team accountable for this module. */
	owner: string;
	/** Sort position for routes and navigation items. Lower comes first. */
	order: number;
	/** Routes anyone can reach, including guests. */
	publicRoutes?: RouteObject[];
	/** Routes that require a logged-in user. The shell applies the auth guard. */
	privateRoutes?: RouteObject[];
}
