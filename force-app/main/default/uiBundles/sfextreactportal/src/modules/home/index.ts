import type { PortalModule } from "@/shell/moduleContract";
import { lazyPage } from "@/shell/lazyPage";

const home: PortalModule = {
	id: "home",
	owner: "portal-app-team",
	order: 10,
	publicRoutes: [
		{
			index: true,
			lazy: lazyPage(() => import("./pages/Home")),
			handle: { showInNavigation: true, label: "Home" },
		},
	],
};

export default home;
