# Bring in custom CSS or a corporate design system

The portal's look comes from CSS variables, called tokens, in
`src/styles/global.css`. Tailwind classes and the components in `src/components/ui`
read those tokens, so changing them restyles every module at once.

To apply a corporate design language system (DLS), add one stylesheet that maps your
DLS values onto these tokens. Paths in this guide are relative to
`force-app/main/default/uiBundles/sfextreactportal`.

> Only use branding you have the rights to. This portal has a public login page, so
> copying another company's logo or look can create legal and phishing risks.

## How Bootstrap and reactstrap fit in

The portal uses [reactstrap](https://reactstrap.github.io/) with Bootstrap 5.

- `src/components/ui` wraps reactstrap and Bootstrap's classes, so modules keep importing
  from there and don't need to know about either library.
- Menus, select lists, dialogs and popovers keep Radix for keyboard and screen reader
  behaviour, styled with Bootstrap's classes.
- `src/styles/bootstrap.scss` builds Bootstrap from source **without its utility classes**.
  They are `!important` and share names with Tailwind's (`p-4`, `mb-0`), so use Tailwind
  for layout and spacing. Don't import `bootstrap/dist/css/bootstrap.css`.
- Bootstrap sits in a CSS layer below Tailwind's utilities, so a Tailwind class on a
  component overrides Bootstrap. The layer order is at the top of `src/styles/global.css`.

The tokens below drive Tailwind classes. To change a Bootstrap component's own look, such
as `.btn-primary`, set its Sass variables above the imports in `src/styles/bootstrap.scss`.

## 1. Add your stylesheet

Create `src/styles/corporate-dls.css`:

```css
@font-face {
  font-family: 'Corporate Sans';
  src: url('../assets/fonts/corporate-sans.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

:root {
  /* Your DLS values */
  --dls-color-brand: #7a1f5c;
  --dls-color-surface: #fbf7f9;

  /* Portal tokens mapped to them */
  --primary: var(--dls-color-brand);
  --background: var(--dls-color-surface);
  --ring: var(--dls-color-brand);
  --radius: 0;
}

body {
  font-family: 'Corporate Sans', Georgia, serif;
}

/* Optional: your own DLS classes */
.dls-badge {
  background: var(--dls-color-brand);
  color: #fff;
  padding: 2px 8px;
}
```

Put font files in `src/assets/fonts/`. The build copies them into the app.

## 2. Load it after the base theme

In `src/app.tsx`, import your file straight after `global.css`. Order matters, because
the later file wins:

```ts
import "./styles/global.css";
import "./styles/corporate-dls.css";
```

## 3. Map your tokens

| Token | Controls |
| --- | --- |
| `--primary`, `--primary-foreground` | Main buttons, logo tile, home banner, and the text on them |
| `--secondary`, `--secondary-foreground` | Secondary buttons and the active menu item |
| `--accent`, `--accent-foreground` | Highlighted menu and list items |
| `--background`, `--foreground` | Page background and main text |
| `--card`, `--card-foreground` | Cards and panels |
| `--popover`, `--popover-foreground` | Dropdowns and popovers |
| `--muted`, `--muted-foreground` | Quiet backgrounds and secondary text |
| `--border`, `--input`, `--ring` | Borders, input outlines, and focus rings |
| `--destructive` | Errors and destructive actions |
| `--radius` | Corner rounding. Use `0` for square corners |
| `--chart-1` to `--chart-5` | Chart colors |

## 4. Set the name and logo

- **Name:** change `BRAND_NAME` and `BRAND_INITIALS` in `src/lib/brand.ts`, and the
  fallback `<title>` in `index.html`.
- **Logo:** edit `src/components/BrandLogo.tsx`. Put image files in `src/assets/images/`.

## 5. Check it, then deploy

```bash
npm run build
```

From the project root:

```bash
sf project deploy start --source-dir force-app/main/default/uiBundles --target-org <alias>
```

Then check the login, search, and home pages at desktop and mobile widths, including
text contrast and visible keyboard focus. Do a hard refresh if the old look still shows.

## Using a DLS package

If your DLS ships as an npm package, install it and import its token or variables file
above your mapping:

```css
@import '@your-org/dls/tokens.css';
```

Prefer a tokens-only file. A full stylesheet can include global resets and element
styles that override the portal's components. If you need to change a component beyond
what tokens allow, edit it in `src/components/ui`, which keeps the change in one place.

## Rules for Salesforce hosting

- **Bundle CSS and fonts with the app.** The site's Content Security Policy blocks
  external stylesheets. In testing, a link to `fonts.googleapis.com` was refused, while
  CSS and a `.woff2` font in the bundle loaded normally. An external source would need
  to be allowed in the org's Content Security Policy settings first.
- **Use tokens in modules.** Write `bg-primary` rather than `bg-blue-600`, so each module
  follows the theme.
- **Keep shared styling out of modules.** Corporate CSS belongs in `src/styles`, so feature
  teams inherit it without changing their code.
