import { Outlet, Link, useLocation } from "react-router";
import BrandLogo from "./components/BrandLogo";
import { getAllRoutes } from "./router-utils";
import { useEffect, useId, useRef, useState } from "react";
import { AuthMenu } from "./features/authentication/menu/AuthMenu";
import { Collapse, Nav, Navbar, NavItem, NavLink } from "reactstrap";
import CustomerWebClientChat from "./components/CustomerWebClientChat";

export default function AppLayout() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navId = useId();
	const outletWrapperRef = useRef<HTMLDivElement>(null);
	const previousPathname = useRef<string | null>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (previousPathname.current !== null && previousPathname.current !== location.pathname) {
			const wrapper = outletWrapperRef.current;
			const target = wrapper?.querySelector<HTMLElement>("h1");
			if (target) {
				if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
				target.focus();
			}
		}
		previousPathname.current = location.pathname;
	}, [location.pathname]);

	const isActive = (path: string) => location.pathname === path;

	const toggleMenu = () => setIsOpen(!isOpen);

	const navigationRoutes: { path: string; label: string }[] = getAllRoutes()
		.filter(
			(route) =>
				route.handle?.showInNavigation === true &&
				route.fullPath !== undefined &&
				route.handle?.label !== undefined,
		)
		.map(
			(route) =>
				({
					path: route.fullPath,
					label: route.handle?.label,
				}) as { path: string; label: string },
		);

	return (
		<>
			<a
				href="#main-content"
				onClick={(e) => {
					e.preventDefault();
					const content = outletWrapperRef.current;
					if (content) {
						if (!content.hasAttribute("tabindex")) content.setAttribute("tabindex", "-1");
						content.focus();
					}
				}}
				className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow focus:ring-2 focus:ring-gray-900"
			>
				Skip to main content
			</a>
			<Navbar
				aria-label="Primary"
				expand="md"
				light
				color="white"
				className="border-b shadow-sm"
				container={false}
			>
				<div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 px-4 sm:px-6 lg:px-8">
					<BrandLogo />
					<div className="order-2 ml-auto flex items-center gap-2 md:order-3">
						<AuthMenu />
						<button
							ref={menuButtonRef}
							type="button"
							className="navbar-toggler"
							onClick={toggleMenu}
							aria-label="Toggle menu"
							aria-expanded={isOpen}
							aria-controls={navId}
						>
							<span aria-hidden="true" className="navbar-toggler-icon" />
						</button>
					</div>
					<Collapse id={navId} isOpen={isOpen} navbar className="order-3 md:order-2">
						<Nav navbar>
							{navigationRoutes.map((item) => (
								<NavItem key={item.path}>
									<NavLink
										tag={Link}
										to={item.path}
										active={isActive(item.path)}
										aria-current={isActive(item.path) ? "page" : undefined}
										onClick={() => {
											setIsOpen(false);
											if (isActive(item.path)) menuButtonRef.current?.focus();
										}}
									>
										{item.label}
									</NavLink>
								</NavItem>
							))}
						</Nav>
					</Collapse>
				</div>
			</Navbar>
			<div id="main-content" ref={outletWrapperRef}>
				<Outlet />
			</div>
			<CustomerWebClientChat
				orgId="<ORG_ID_15_OR_18_CHAR_00D...>"
				deploymentName="<EMBEDDED_SERVICE_DEPLOYMENT_NAME>"
				siteURL="<SITE_URL>"
				scrt2URL="<SCRT2_URL>"
			/>
		</>
	);
}
