import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import { CenteredPageLayout } from "../layout/centered-page-layout";
import { AuthForm } from "../forms/auth-form";
import { useAppForm } from "../hooks/form";
import { ROUTES, AUTH_PLACEHOLDERS } from "../authenticationConfig";
import { emailSchema, passwordSchema, getStartUrl, type AuthResponse } from "../authHelpers";
import { ApiError, handleApiResponse, postGuestRequest } from "../utils/helpers";

const registerSchema = z
	.object({
		firstName: z.string().trim().min(1, "First name is required"),
		lastName: z.string().trim().min(1, "Last name is required"),
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
		startUrl: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export default function Register() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [submitError, setSubmitError] = useState<React.ReactNode>(null);

	const form = useAppForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			startUrl: getStartUrl(searchParams) || "",
		},
		validators: { onChange: registerSchema, onSubmit: registerSchema },
		onSubmit: async ({ value: formFieldValues }) => {
			setSubmitError(null);
			try {
				// "/services/apexrest/auth/register" is a custom Apex class exposed as a REST
				// resource. It handles duplicate checks and user creation.
				const { confirmPassword: _confirmPassword, ...request } = formFieldValues;
				const response = await postGuestRequest("/services/apexrest/auth/register", { request });
				const result = await handleApiResponse<AuthResponse>(response);
				if (result?.redirectUrl) {
					// Hard navigate with assign (not replace) so this page stays in history and
					// the browser Back button returns here after an MFA/verification screen.
					window.location.assign(result.redirectUrl);
				} else {
					// In case redirectUrl is null, redirect to the login page
					navigate(ROUTES.LOGIN.PATH, { replace: true });
				}
			} catch (err) {
				console.error("Registration failed", err);
				if (err instanceof ApiError) {
					setSubmitError(
						<ul role="list">
							{err.errors.map((e, i) => (
								<li key={i}>{e}</li>
							))}
						</ul>,
					);
				} else {
					setSubmitError("Registration failed");
				}
			}
		},
		onSubmitInvalid: () => {},
	});

	return (
		<CenteredPageLayout title={ROUTES.REGISTER.TITLE}>
			<form.AppForm>
				<AuthForm
					title="Sign Up"
					description="Enter your information to create an account"
					error={submitError}
					submit={{ text: "Create an account", loadingText: "Creating account…" }}
					footer={{
						text: "Already have an account?",
						link: ROUTES.LOGIN.PATH,
						linkText: "Sign in",
					}}
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
						<form.AppField name="firstName">
							{(field) => (
								<field.TextField
									label="First name"
									placeholder={AUTH_PLACEHOLDERS.FIRST_NAME}
									autoComplete="given-name"
								/>
							)}
						</form.AppField>
						<form.AppField name="lastName">
							{(field) => (
								<field.TextField
									label="Last name"
									placeholder={AUTH_PLACEHOLDERS.LAST_NAME}
									autoComplete="family-name"
								/>
							)}
						</form.AppField>
					</div>
					<form.AppField name="email">
						{(field) => <field.EmailField label="Email" />}
					</form.AppField>
					<form.AppField name="password">
						{(field) => (
							<field.PasswordField
								label="Password"
								placeholder={AUTH_PLACEHOLDERS.PASSWORD_CREATE}
								autoComplete="new-password"
							/>
						)}
					</form.AppField>
					<form.AppField name="confirmPassword">
						{(field) => (
							<field.PasswordField
								label="Confirm Password"
								placeholder={AUTH_PLACEHOLDERS.PASSWORD_CONFIRM}
								autoComplete="new-password"
							/>
						)}
					</form.AppField>
				</AuthForm>
			</form.AppForm>
		</CenteredPageLayout>
	);
}
