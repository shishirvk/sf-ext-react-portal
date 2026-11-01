import type { RouteObject } from "react-router";
import NotFound from "./pages/NotFound";
import AuthAppLayout from "./features/authentication/layouts/AuthAppLayout";
import PrivateRoute from "./features/authentication/layouts/privateRouteLayout";
import { privateModuleRoutes, publicModuleRoutes } from "./shell/moduleRegistry";

/** Routes come from src/modules/<id>/index.ts. See MODULES.md before editing. */
export const routes: RouteObject[] = [
	{
		path: "/",
		element: <AuthAppLayout />,
		hydrateFallbackElement: <p className="p-8 text-center text-muted-foreground">Loading…</p>,
		children: [
			...publicModuleRoutes,
			{
				element: <PrivateRoute />,
				children: privateModuleRoutes,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
];
