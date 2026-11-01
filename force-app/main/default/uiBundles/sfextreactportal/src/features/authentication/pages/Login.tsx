import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { z } from "zod";
import { CenteredPageLayout } from "../layout/centered-page-layout";
import { AuthForm } from "../forms/auth-form";
import { useAppForm } from "../hooks/form";
import { ROUTES } from "../authenticationConfig";
import { emailSchema, getStartUrl, type AuthResponse } from "../authHelpers";
import { ApiError, handleApiResponse, postGuestRequest } from "../utils/helpers";
import { SocialLogin } from "../components/SocialLogin";

const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, "Password is required"),
});

export default function Login() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [submitError, setSubmitError] = useState<React.ReactNode>(null);

	const form = useAppForm({
		defaultValues: { email: "", password: "" },
		validators: { onChange: loginSchema, onSubmit: loginSchema },
		onSubmit: async ({ value }) => {
			setSubmitError(null);
			try {
				const response = await postGuestRequest("/services/apexrest/auth/login", {
					email: value.email.trim().toLowerCase(),
					password: value.password,
					startUrl: getStartUrl(searchParams),
				});
				const result = await handleApiResponse<AuthResponse>(response);
				if (result?.redirectUrl) {
					// Hard navigate with assign (not replace) so /login stays in history and the
					// browser Back button returns here after an MFA/verification screen.
					window.location.assign(result.redirectUrl);
				} else {
					// In case redirectUrl is null, navigate to home
					navigate("/", { replace: true });
				}
			} catch (err) {
				console.error("Login failed", err);
				if (err instanceof ApiError) {
					setSubmitError(
						err.errors.length === 1 ? (
							err.errors[0]
						) : (
							<ul role="list">
								{err.errors.map((e, i) => (
									<li key={i}>{e}</li>
								))}
							</ul>
						),
					);
				} else {
					setSubmitError("Login failed");
				}
			}
		},
		onSubmitInvalid: () => {},
	});

	return (
		<CenteredPageLayout
			title={ROUTES.LOGIN.TITLE}
			topAligned={false}
			className="glass-backdrop min-h-[calc(100svh-4rem)]"
		>
			<form.AppForm>
				<AuthForm
					title="Login"
					cardClassName="glass-panel"
					description="Enter your email below to login to your account"
					error={submitError}
					submit={{ text: "Login", loadingText: "Logging in…" }}
					footer={{
						text: "Don't have an account?",
						link: ROUTES.REGISTER.PATH,
						linkText: "Sign up",
					}}
				>
					<form.AppField name="email">
						{(field) => <field.EmailField label="Email" />}
					</form.AppField>
					<form.AppField name="password">
						{(field) => (
							<field.PasswordField
								label="Password"
								labelAction={
									<Link
										to={ROUTES.FORGOT_PASSWORD.PATH}
										className="text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								}
							/>
						)}
					</form.AppField>
				</AuthForm>
				<SocialLogin />
			</form.AppForm>
		</CenteredPageLayout>
	);
}
