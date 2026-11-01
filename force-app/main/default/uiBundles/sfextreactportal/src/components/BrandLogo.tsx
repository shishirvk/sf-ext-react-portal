import { Link } from "react-router";
import { BRAND_INITIALS, BRAND_NAME } from "@/lib/brand";

export default function BrandLogo() {
	return (
		<Link to="/" className="navbar-brand mr-0 flex items-center gap-2.5 no-underline">
			<span
				aria-hidden="true"
				className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-bold tracking-wide text-primary-foreground"
			>
				{BRAND_INITIALS}
			</span>
			<span className="text-lg font-semibold tracking-tight">{BRAND_NAME}</span>
		</Link>
	);
}
