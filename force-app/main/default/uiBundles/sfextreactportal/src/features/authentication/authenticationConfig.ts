import { BRAND_NAME } from "@/lib/brand";
/**
 * [Dev Note] Centralized configuration for Auth routes.
 * Each route contains both the path and page title.
 * Using constants prevents typos in route paths across the application.
 */
export const ROUTES = {
	LOGIN: {
		PATH: "/login",
		TITLE: `Login | ${BRAND_NAME}`,
	},
	REGISTER: {
		PATH: "/register",
		TITLE: `Create Account | ${BRAND_NAME}`,
	},
	FORGOT_PASSWORD: {
		PATH: "/forgot-password",
		TITLE: `Recover Password | ${BRAND_NAME}`,
	},
	RESET_PASSWORD: {
		PATH: "/reset-password",
		TITLE: `Reset Password | ${BRAND_NAME}`,
	},
	PROFILE: {
		PATH: "/profile",
		TITLE: `My Profile | ${BRAND_NAME}`,
	},
	CHANGE_PASSWORD: {
		PATH: "/change-password",
		TITLE: `Change Password | ${BRAND_NAME}`,
	},
} as const;

/**
 * [Dev Note] Centralized configuration for API endpoints.
 * These are server-side endpoints, not client-side routes.
 */
export const API_ROUTES = {
	// W-21253864: Logout URL integration is not currently supported
	LOGOUT: "/secur/logout.jsp",
} as const;

/**
 * [Dev Note] Query parameter key used to store the return URL.
 * e.g. /login?startUrl=/profile
 */
export const AUTH_REDIRECT_PARAM = "startUrl";

/**
 * Placeholder text constants for authentication form inputs.
 */
export const AUTH_PLACEHOLDERS = {
	EMAIL: "e.g. name@example.com",
	PASSWORD: "Enter your password",
	PASSWORD_CREATE: "Create a password",
	PASSWORD_CONFIRM: "Re-enter your password",
	PASSWORD_NEW: "Enter new password",
	PASSWORD_NEW_CONFIRM: "Re-enter new password",
	FIRST_NAME: "e.g. Alex",
	LAST_NAME: "e.g. Smith",
	USERNAME: "e.g. asmith",
} as const;
