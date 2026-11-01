import { ROUTES } from "@/features/authentication/authenticationConfig";
import type { PortalModule } from "@/shell/moduleContract";
import { lazyPage } from "@/shell/lazyPage";

/**
 * Login and account pages. The pages stay in features/authentication because the
 * shell's layout and auth guard depend on that code; this module only routes to them.
 */
const identity: PortalModule = {
	id: "identity",
	owner: "portal-platform-team",
	order: 20,
	publicRoutes: [
		{
			path: ROUTES.LOGIN.PATH,
			lazy: lazyPage(() => import("@/features/authentication/pages/Login")),
			handle: { showInNavigation: false, label: "Login", title: ROUTES.LOGIN.TITLE },
		},
		{
			path: ROUTES.REGISTER.PATH,
			lazy: lazyPage(() => import("@/features/authentication/pages/Register")),
			handle: { showInNavigation: false, title: ROUTES.REGISTER.TITLE },
		},
		{
			path: ROUTES.FORGOT_PASSWORD.PATH,
			lazy: lazyPage(() => import("@/features/authentication/pages/ForgotPassword")),
			handle: { showInNavigation: false, title: ROUTES.FORGOT_PASSWORD.TITLE },
		},
		{
			path: ROUTES.RESET_PASSWORD.PATH,
			lazy: lazyPage(() => import("@/features/authentication/pages/ResetPassword")),
			handle: { showInNavigation: false, title: ROUTES.RESET_PASSWORD.TITLE },
		},
	],
	privateRoutes: [
		{
			path: ROUTES.PROFILE.PATH,
			lazy: lazyPage(() => import("@/features/authentication/pages/Profile")),
			handle: { showInNavigation: false, label: "Profile", title: ROUTES.PROFILE.TITLE },
		},
		{
			path: ROUTES.CHANGE_PASSWORD.PATH,
			lazy: lazyPage(() => import("@/features/authentication/pages/ChangePassword")),
			handle: { showInNavigation: false, title: ROUTES.CHANGE_PASSWORD.TITLE },
		},
	],
};

export default identity;
