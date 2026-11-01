import type { PortalModule } from "@/shell/moduleContract";
import { lazyPage } from "@/shell/lazyPage";

const search: PortalModule = {
	id: "search",
	owner: "portal-app-team",
	order: 30,
	publicRoutes: [
		{
			path: "search",
			lazy: lazyPage(() => import("./pages/SearchPage")),
			handle: { showInNavigation: true, label: "Search" },
		},
	],
};

export default search;
