# Ellucian Experience

**May 4, 2026**

---

## Notices and Privacy

© 2026 Ellucian Company LLC and its affiliates.

---

## Table of Contents

- [Experience 2.4](#experience-24)
- [Experience SDK 8.1.2](#experience-sdk-812)
- [Experience 2.3](#experience-23)
- [Upgrade an extension to the latest SDK version](#upgrade-an-extension-to-the-latest-sdk-version)
  - [Upgrade to the latest SDK 8.x version from an earlier SDK 8.x version](#upgrade-to-the-latest-sdk-8x-version-from-an-earlier-sdk-8x-version)
  - [Upgrade to SDK 8.x from SDK 7.x or earlier](#upgrade-to-sdk-8x-from-sdk-7x-or-earlier)
  - [Update the .babelrc file](#update-the-babelrc-file)
  - [Upgrade to ESLint 9.x](#upgrade-to-eslint-9x)
  - [Upgrade to React 19.x](#upgrade-to-react-19x)
  - [Upgrade to Path 8.x](#upgrade-to-path-8x)
  - [Upgrade to the latest SDK 7.x version](#upgrade-to-the-latest-sdk-7x-version)
- [Extension updates to address breaking changes in dependencies](#extension-updates-to-address-breaking-changes-in-dependencies)

---

## Experience 2.4

Updates

---

## Experience SDK 8.1.2

- Upgrade to Ellucian Path Design System v8.4.0 and ds-icons v5.3.0
- Upgrade to Node.js 24.13.0

### Upgrading your extensions

Update `package.json`, then remove `package-lock.json` and `node_modules`, and run `npm install`.

---

## Experience 2.3

- Production release - Manage permissions by role
- Classes card and page - multiple meeting schedules

### Classes card example

The Classes card now supports multiple meeting schedules. For example, a course such as "AMST 115 US History to Civil War" may display:

- **Tue/Thu 11:00 AM - 11:50 AM** — Traditional, Jan 1, 2022 – Dec 31, 2025
- **Mon 1:00 AM - 1:11 AM** — Traditional, Jan 7, 2022 – Mar 1, 2022
- An "Additional meetings available" link surfaces extra meeting times.

### Page Designer enhancements

For Page Designer pages built with the HTML editor, styling around the content has changed. You will see less padding on the page. If you have added advanced styling through the HTML, check that the page is still behaving as expected.

For Page Designer pages built with the rich text editor, the header will now stay in place when scrolling.

### `resources` and `about` endpoints

Previously, Experience configuration included defining `resources` and `about` endpoints for the Banner or Colleague Ethos APIs. To simplify the configuration process and avoid issues when those endpoints were not properly defined, Ellucian has modified Experience to no longer require those endpoints.

No action is required for Experience implementations where those endpoints have already been defined. They will be ignored.

### Updates

For a list of the issues addressed in Experience 2.3, see the **Related Defects** and **Related Enhancements** tabs on the release page for Experience 2.3 in the Ellucian Customer Center.

---

## Upgrade an extension to the latest SDK version

### Upgrade to the latest SDK 8.x version from an earlier SDK 8.x version

#### About this task

Use this procedure when moving between SDK 8.x releases (for example, from 8.0.x to 8.1.2).

#### Procedure

1. Update the `dependencies` and `devDependencies` in `package.json` to match the versions below.

```json
"dependencies": {
    "@ellucian/ds-icons": "https://cdn.elluciancloud.com/assets/EDS2/8.4.0/umd/path_design_system_icons.tgz",
    "@ellucian/experience-extension-utils": "https://cdn.elluciancloud.com/assets/SDK/utils/1.1.0/ellucian-experience-extension-utils-1.1.0.tgz",
    "@ellucian/react-design-system": "https://cdn.elluciancloud.com/assets/EDS2/8.4.0/umd/path_design_system.tgz",
    "react": "19.0.3",
    "react-dom": "19.0.3",
    "react-intl": "7.1.11",
    "react-router-dom": "5.2.0"
},
"devDependencies": {
    "@ellucian/experience-extension": "https://cdn.elluciancloud.com/assets/SDK/8.1.2/ellucian-experience-extension-8.1.2.tgz"
}
```

2. Save `package.json`, then delete `package-lock.json` and the `node_modules` folder.
3. Reinstall dependencies:

```bash
cd my_extension
npm install
```

---

### Upgrade to SDK 8.x from SDK 7.x or earlier

#### Update the extension dependencies

Edit `package.json`:

- Update `@ellucian/experience-extension-utils` in `dependencies`.
- Remove `moment` from `dependencies` if it is no longer required by your code (replace `moment` usage with a supported alternative).
- Update `@ellucian/experience-extension` in `devDependencies`.
- Move `prop-types` to `dependencies` if your code still uses it.

#### Procedure

```json
"dependencies": {
    "@ellucian/ds-icons": "https://cdn.elluciancloud.com/assets/EDS2/8.4.0/umd/path_design_system_icons.tgz",
    "@ellucian/experience-extension-utils": "https://cdn.elluciancloud.com/assets/SDK/utils/1.1.0/ellucian-experience-extension-utils-1.1.0.tgz",
    "@ellucian/react-design-system": "https://cdn.elluciancloud.com/assets/EDS2/8.4.0/umd/path_design_system.tgz",
    "react": "19.0.3",
    "react-dom": "19.0.3",
    "react-intl": "7.1.11",
    "react-router-dom": "5.2.0"
}
```

Update the `devDependencies` in `package.json`. Add `@babel/eslint-parser` and update `@ellucian/experience-extension`:

```json
"@ellucian/experience-extension": "https://cdn.elluciancloud.com/assets/SDK/8.1.2/ellucian-experience-extension-8.1.2.tgz",
"@eslint/js": "9.33.0"
```

Add the following `overrides` block to `package.json`:

```json
"overrides": {
    "@ellucian/react-design-system": {
        "@tanstack/react-virtual": "3.11.3"
    }
}
```

After saving `package.json`, delete `package-lock.json` and the `node_modules` folder, then run:

```bash
cd my_extension
npm install
```

---

### Update the .babelrc file

#### Procedure

In `.babelrc`:

- Configure `@babel/preset-react` in `presets` with `"runtime": "automatic"`.
- In `plugins`:
  - Remove `@babel/plugin-proposal-class-properties`.
  - Remove `@babel/transform-runtime`.
  - Add `@babel/plugin-transform-runtime`.

The example below shows the `presets` and `plugins` objects after making the changes. Your version might look different if you previously made customizations to the `.babelrc` file.

```json
{
    "presets": [
        "@babel/preset-env",
        ["@babel/preset-react", {
            "runtime": "automatic"
        }]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

Save your changes to the `.babelrc` file.

---

### Upgrade to ESLint 9.x

Experience SDK 8.x uses ESLint 9.x, which requires a change to the configuration. The content in `.eslintrc.json` will need to be rewritten to a file called `eslint.config.mjs`, in a form that follows the requirements for ESLint 9.

#### Before you begin

Update the ESLint dependencies in the `package.json` file as described in *Update the extension dependencies*.

#### Procedure

1. Add a file called `eslint.config.mjs` to your extension directory.
   - If you have not changed any of the default ESLint rules in your extension, you can use the `eslint.config.mjs` file attached to the official documentation page. To download that file, click **Attachment** on the page, download the zip file, and extract the `eslint.config.mjs` file.
   - If you have customized the ESLint rules, review the information in the ESLint 9.x Migration Guide and then create an `eslint.config.mjs` file that includes your customizations, using the attached version as a guide.

2. Remove the following files from your extension directory. They are not used in the new ESLint configuration.
   - `.eslintcache`
   - `.eslintignore`
   - `.eslintrc.json`

---

### Upgrade to React 19.x

Follow React's official 18 → 19 migration guide and verify that any third-party libraries used by the extension support React 19.

---

### Upgrade to Path 8.x

Update `@ellucian/react-design-system` and `@ellucian/ds-icons` to the 8.x versions shown above. Review any breaking changes documented for Path Design System 8.x and update component usage accordingly.

---

### Upgrade to the latest SDK 7.x version

#### About this task

Use this procedure if you need to stay on the SDK 7.x line and move to the most recent 7.x release.

#### Procedure

Update `package.json`:

- Update `@ellucian/experience-extension-utils` in `dependencies`.
- Remove `moment` from `dependencies` if it is no longer needed.
- Update `@ellucian/experience-extension` in `devDependencies`.

```json
"dependencies": {
    "@ellucian/ds-icons": "https://cdn.elluciancloud.com/assets/EDS2/7.19.1/umd/path_design_system_icons.tgz",
    "@ellucian/experience-extension-utils": "https://cdn.elluciancloud.com/assets/SDK/utils/1.0.0/ellucian-experience-extension-utils-1.0.0.tgz",
    "@ellucian/react-design-system": "https://cdn.elluciancloud.com/assets/EDS2/7.19.1/umd/path_design_system.tgz",
    "classnames": "2.2.6",
    "prop-types": "15.7.2",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-intl": "5.12.5",
    "react-router-dom": "5.2.0"
},
"devDependencies": {
    "@ellucian/experience-extension": "https://cdn.elluciancloud.com/assets/SDK/7.18.1/ellucian-experience-extension-7.18.1.tgz"
}
```

After saving `package.json`, delete `package-lock.json` and the `node_modules` folder, then run:

```bash
cd my_extension
npm install
```

---

## Extension updates to address breaking changes in dependencies

When upgrading, review the following areas of your extension code for breaking changes:

- `experience-extension`
- `experience-extension-utils`
- Date picker components: `LegacyDatePicker`, `DatePicker`, `DateRangePicker`
- `webpack-cli`
- `react-intl`

Test each card and page in the extension after the upgrade and address any deprecation warnings or runtime errors.

---

*© 2026 Ellucian Company LLC and its affiliates.*
