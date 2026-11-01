import type { PortalModule } from "@/shell/moduleContract";
import { lazyPage } from "@/shell/lazyPage";

const accounts: PortalModule = {
	id: "accounts",
	owner: "portal-app-team",
	order: 50,
	publicRoutes: [
		{
			path: "accounts/:recordId",
			lazy: lazyPage(() => import("./pages/AccountObjectDetailPage")),
		},
	],
};

export default accounts;
