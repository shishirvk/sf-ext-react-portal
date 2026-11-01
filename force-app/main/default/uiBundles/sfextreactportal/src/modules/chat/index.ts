import type { PortalModule } from "@/shell/moduleContract";
import { lazyPage } from "@/shell/lazyPage";

const chat: PortalModule = {
	id: "chat",
	owner: "portal-app-team",
	order: 40,
	publicRoutes: [
		{
			path: "test-chat",
			lazy: lazyPage(() => import("./pages/TestChatPage")),
			handle: { showInNavigation: false, label: "Test Chat" },
		},
	],
};

export default chat;
