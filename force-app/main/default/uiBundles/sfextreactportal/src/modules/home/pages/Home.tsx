import { BRAND_NAME } from "@/lib/brand";
import { GlobalSearchBox } from "@/modules/search/public";

export default function HomePage() {
	return (
		<main>
			<title>{`Home | ${BRAND_NAME}`}</title>
			<section className="bg-primary shadow-sm text-primary-foreground">
				<div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
					<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						Welcome to {BRAND_NAME}
					</h1>
					<p className="mt-3 mb-0 text-lg">
						Find your accounts, contacts, and content in one place.
					</p>
					<div className="mt-8 rounded-xl bg-card p-3 text-card-foreground shadow-lg">
						<GlobalSearchBox placeholder="Search accounts, contacts, opportunities..." />
					</div>
				</div>
			</section>
		</main>
	);
}
