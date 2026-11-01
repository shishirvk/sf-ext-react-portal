# React External App

## Floorplan

Access the technical documentation and app design here : [App-Design-Floorplan](https://shishirvk.github.io/sf-ext-react-portal/)

A customer-facing portal on the Salesforce platform, hosted on Experience Cloud. It includes login and registration, global search, a themeable design, and a modular structure that lets a separate team build features independently. Built with React, Vite, TypeScript, and Tailwind/shadcn.

| I want to... | Go to |
| --- | --- |
| Install it on a scratch org | [Install on a scratch org](#install-on-a-scratch-org) |
| Apply corporate CSS or a design system | [Custom styling guide](docs/custom-styling.md) |
| Add a feature or work as a separate team | [Module architecture](force-app/main/default/uiBundles/sfextreactportal/MODULES.md) |

## What's included

```
force-app/main/default/
├── classes/                      # Apex Auth Logic
│   ├── UIBundleAuthUtils.cls
│   ├── UIBundleChangePassword.cls
│   ├── UIBundleForgotPassword.cls
│   ├── UIBundleLogin.cls
│   └── UIBundleRegistration.cls
├── digitalExperienceConfigs/     # Site configuration
├── digitalExperiences/           # Site definition & branding
├── networks/                     # Experience Cloud network setup
├── sites/                        # Salesforce Site metadata
└── uiBundles/
    └── sfextreactportal/         # React UI Bundle (source, config, tests)
        └── src/
            ├── shell/                # Module contract and discovery
            ├── modules/              # Feature modules, one folder each
            ├── styles/               # Theme tokens
            └── lib/brand.ts          # Portal name and initials
docs/
└── custom-styling.md             # Corporate CSS and design system guide
```

## Install on a scratch org

This installs the whole portal into a temporary org. The steps were tested from a clean copy of this repo with Salesforce CLI 2.156.8 and Node 23.11.

### Prerequisites

- Salesforce CLI with the React templates and UI Bundle support. Run `sf update`, or `npm install -g @salesforce/cli@latest` if you installed it with npm.
- Node.js and npm.
- A Dev Hub org you are logged in to. Check with `sf org list`, or log in with `sf org login web --set-default-dev-hub --alias <dev-hub-alias>`.

### Steps

Run these from the project root.

1. Create the scratch org. `config/project-scratch-def.json` already enables Digital Experiences, which the site needs.

   ```bash
   sf org create scratch \
     --definition-file config/project-scratch-def.json \
     --alias portal-scratch \
     --duration-days 7 \
     --target-dev-hub <dev-hub-alias>
   ```

2. Install the project dependencies.

   ```bash
   npm install
   ```

3. Build and deploy everything. This builds the React app, deploys all metadata, assigns the guest permission set, and generates the GraphQL schema and types.

   ```bash
   npm run setup -- --target-org portal-scratch --yes
   ```

   A successful run ends with `Setup complete.` and a summary. Role, self-registration, social login, and data show as skipped because this project has no configuration for them.

4. Find the site URL.

   ```bash
   sf data query --target-org portal-scratch \
     --query "SELECT Domain.Domain, PathPrefix FROM DomainSite"
   ```

   Open `https://<Domain>/sfextreactportal`, using the row whose path is `/sfextreactportal`.

5. Confirm it works. The home page should show "Welcome to Customer Portal", and `/profile` should redirect guests to `/login`.

### What setup changes locally

Setup creates `schema.graphql`, `src/api/graphql-operations-types.ts`, and a `.gitignore` in the UI Bundle. It can also change the sender address in the network metadata file to match the org. Review those changes before committing.

### Clean up

Scratch orgs expire on their own. To delete one sooner:

```bash
sf org delete scratch --target-org portal-scratch
```

### Troubleshooting

| Symptom | Fix |
| --- | --- |
| `sf template generate project` is not found, or React templates are missing | Update the Salesforce CLI. |
| `sObject type 'Network' is not supported` | The org was created without Digital Experiences. Create a new one from the current `config/project-scratch-def.json`. |
| A site page loads with data errors for guests | Check that the setup summary shows `permset` as ok. See the guest GraphQL note under [Setup scripts](#setup-scripts). |
| The UI Bundle fails with `UNKNOWN_EXCEPTION` on a non-scratch org, even though a dry run passed | This is a server-side error. Check that Salesforce Multi-Framework is on in Setup, then contact Salesforce Support or test in a scratch org. |

## Getting started

Install project dependencies and start the local dev server:

```bash
npm install
npm run sf-project-setup
```

This installs the UI Bundle dependencies, builds the app, and opens the dev server at http://localhost:5173. For manual build and test instructions, see the [UI Bundle README](force-app/main/default/uiBundles/sfextreactportal/README.md).

## Customize the look

The portal's colors, corners, fonts, and name can all be changed without editing feature code. To apply a corporate design system, follow the [custom styling guide](docs/custom-styling.md).

## Add features

To build your own feature, add a module as described in [Module architecture](force-app/main/default/uiBundles/sfextreactportal/MODULES.md).

Use the features CLI to install additional prebuilt UI features into the UI Bundle.

List all available features:

```bash
npx @salesforce/ui-bundle-features-experimental list
```

Get details about a specific feature (description, dependencies, files, and integration examples):

```bash
npx @salesforce/ui-bundle-features-experimental describe <feature-name>
```

Install a feature:

```bash
npx @salesforce/ui-bundle-features-experimental install <feature-name> --ui-bundle-dir sfextreactportal
```

After installation, the CLI will list any `__example__` files that need manual integration. Read each example file to see the integration pattern, apply it to the target file, then delete the example file.

## Deploy

### Deploy everything (metadata + Experience Cloud site + UI Bundle)

```bash
cd force-app/main/default/uiBundles/sfextreactportal && npm install && npm run build && cd -
sf project deploy start --source-dir force-app --target-org <alias>
```

### Deploy the UI Bundle only

```bash
cd force-app/main/default/uiBundles/sfextreactportal && npm install && npm run build && cd -
sf project deploy start --source-dir force-app/main/default/uiBundles --target-org <alias>
```

### Deploy Experience Cloud site only

```bash
sf project deploy start \
  --source-dir force-app/main/default/digitalExperienceConfigs \
  --source-dir force-app/main/default/digitalExperiences \
  --source-dir force-app/main/default/networks \
  --source-dir force-app/main/default/sites \
  --target-org <alias>
```

### Deploy authentication classes only

```bash
sf project deploy start --source-dir force-app/main/default/classes --target-org <alias>
```

Replace `<alias>` with your target org alias.

## Setup scripts

Two npm scripts at the project root streamline getting started and deployment.

**`npm run sf-project-setup`** — installs the UI Bundle dependencies, builds the app, and starts the dev server (see [Getting started](#getting-started)).

**`npm run setup`** — runs the full deployment setup in one command: org login (a required precondition, auto-skipped if already connected), UI Bundle build, deploy metadata, fetch GraphQL schema, and run codegen. It no longer starts the dev server — run `npm run dev:preview` for that:

> **Guest and Portal GraphQL API Access requires an org preference** Starting with org release 264, unauthenticated (guest) sessions can only call the GraphQL API — the endpoint this app's data layer uses — if the **Enable GraphQL API for Guest Users** org preference is enabled. It is off by default. This is a security-sensitive, org-wide setting, so enable it through **Setup > Security > API Access Controls > Enable GraphQL API for Guest Users**. Enable it before configuring a guest user profile for this site. Without it, guest GraphQL calls fail with `403 GUEST_INSUFFICIENT_ACCESS`. This applies to any b2b/b2c (external) app whose site allows guest browsing.

```bash
# Install project dependencies first (required before running setup)
npm install

npm run setup -- --target-org <alias>
```

Running without flags presents an interactive step picker. Pass `--yes` to skip it and run all steps immediately:

```bash
npm run setup -- --target-org <alias> --yes
```

Common options:

| Option                    | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `--target-org <alias>`    | Target org. If omitted, uses default org/prompt |
| `--skip-deploy`           | Do not deploy metadata                          |
| `--skip-graphql`          | Skip GraphQL schema fetch and codegen           |
| `--skip-ui-bundle-build`  | Skip `npm install` and UI Bundle build          |
| `--ui-bundle-name <name>` | UI Bundle folder name when multiple exist       |
| `-y, --yes`               | Skip interactive step picker; run all steps     |

> Login is a required precondition (no `--skip-login`), and the dev server is no longer part of setup (no `--skip-dev`); both flags are accepted but ignored. To start the dev server after setup, run `npm run dev:preview`.

For all options: `npm run setup -- --help`.

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
