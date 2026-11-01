# Portal module architecture

The portal is a shell plus feature modules. Each module is owned by one team, is
loaded as its own chunk, and registers itself with no change to shell code.

```
src/
├── shell/               # Module contract, discovery, and route composition
├── routes.tsx           # Combines module routes with the layout and auth guard
├── appLayout.tsx        # Navigation and page frame
├── features/            # Authentication and language switcher, used by the shell
├── components/, lib/,   # Shared UI and helpers, available to every module
│   hooks/, api/, types/
└── modules/
    └── <id>/
        ├── index.ts     # Required: manifest (routes, owner, order)
        ├── public.ts    # Optional: the only file other modules may import
        └── pages/, components/, api/, ...  # Private to the module
```

## Rules

1. A module may import its own files, shared code, `@/shell/moduleContract`,
   `@/shell/lazyPage`, and another module's `public.ts`.
2. A module may not import another module's internals, `routes`, `appLayout`,
   `router-utils`, or `@/shell/moduleRegistry`.
3. Pages are loaded with `lazyPage`, so a module's code stays out of the main chunk.
4. Route paths are unique across modules. A clash fails at startup and in tests.

`npm test` enforces rules 1, 2 and 4.

## Add a module

Create `src/modules/orders/index.ts`:

```ts
import type { PortalModule } from "@/shell/moduleContract";
import { lazyPage } from "@/shell/lazyPage";

const orders: PortalModule = {
	id: "orders",
	owner: "orders-team",
	order: 60,
	publicRoutes: [
		{
			path: "orders",
			lazy: lazyPage(() => import("./pages/OrdersPage")),
			handle: { showInNavigation: true, label: "Orders" },
		},
	],
};

export default orders;
```

Add `pages/OrdersPage.tsx` with a default export. Put routes that need a logged-in
user in `privateRoutes`, and the shell applies the auth guard. Then add the module
to the expected list in `src/shell/__tests__/moduleRegistry.test.ts`.

## Working as a separate team

Assign ownership in your repository's `CODEOWNERS` file, replacing the placeholder
team names:

```
force-app/main/default/uiBundles/sfextreactportal/src/shell/    @your-org/portal-platform-team
force-app/main/default/uiBundles/sfextreactportal/src/modules/  @your-org/portal-app-team
```

The app team can release without touching Apex, permissions, or site metadata:

```bash
# From this folder
npx vitest run && npm run build

# From the project root
sf project deploy start --source-dir force-app/main/default/uiBundles --target-org <alias>
```

## Branding

The portal name lives in `src/lib/brand.ts`, plus the fallback title in `index.html`.
Colors and radius are the `:root` tokens in `src/styles/global.css`. Use token classes
such as `bg-primary` and `text-muted-foreground` rather than fixed colors like
`bg-blue-600`, so modules follow the theme. To apply a corporate design system, see
the [custom styling guide](../../../../../../docs/custom-styling.md).

## Limits

All modules build into one UI bundle, so they are released together. Teams develop
and test independently, but a release of one module ships the current state of all
of them. Every module also uses the same React version.
