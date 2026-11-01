import { BRAND_NAME } from "@/lib/brand";
import { Search as GlobalSearch, config } from "../public";

export default function SearchPage() {
	return (
		<>
			<title>{`Search | ${BRAND_NAME}`}</title>
			<GlobalSearch
				as="main"
				config={config}
				title="Search"
				searchPlaceholder="Search accounts, contacts, opportunities, and content..."
			/>
		</>
	);
}
