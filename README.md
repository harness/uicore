This repo contains code used in the [Harness CD Community Edition](https://github.com/harness/harness-cd-community) which is licensed under the [PolyForm Shield License 1.0.0](./licenses/PolyForm-Shield-1.0.0.txt). This repo also contains code belonging to Harness CD Enterprise Plan which is licensed under the [PolyForm Free Trial License 1.0.0](./licenses/PolyForm-Free-Trial-1.0.0.txt). You may obtain a copy of these licenses in the [licenses](./licenses/) directory at the root of this repository.

This repository contains implementation of [Next Generation UI Architecture](https://docs.google.com/document/d/1oe_cHcDyYhwjJ6QZqyOIlpUWGgYyeCIBfUOdElg2rBg/edit#heading=h.41cp29fl3vvn).

This repo uses a [monorepo architechture](https://monorepo.tools/). We are using [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) for dependency managment and [lerna](https://lerna.js.org/) for package publishing

List of packages:

- [@harness/design-system](./packages/design-system/)
- [@harness/help-panel](./packages/help-panel/)
- [@harness/icons](./packages/icons/)
- [@harness/uicore](./packages/uicore/)
- [@harness/use-modal](./packages/useModal/)

## Branches

- `main` branch is on v3 and uses formik v2
- `v2` branch is on v2 and uses formik v1

> Note: If you need your fix/feature in UICore v2, please open a PR against v2 barnch too.

## Local development

- `yarn setup` - to set up authentication to access Github Package Registry
- `yarn storybook` - to start storybook
- `yarn build` - to build all the packages locally.

> Note: You will need to build the packages once before you start working on the codebase, else you will see error messages relating to package resolutions.

## Icons

Icons are under available `packages/icons` folder. Please follow below steps to add new icons -

1. Place the new icon (in SVG format) inside `packages/icons/src` directory.
2. compress svg images using https://vecta.io/nano
3. remove width and height from svg
4. Run `yarn ui:icons` (under the root directory)
5. Commit all the changes and open a PR.

**Note**: For `uicore/icons` to be auto published, please ensure to bump up the package version in `packages/icons/package.json` _(only if an immediate new release is required)_

## Storybook

`yarn storybook` - to start storybook

Then navigate to [http://localhost:6006](http://localhost:6006) to see storybook.

You can also use `yalc` package for development with nextgen ui

Install it globally

```
yarn global add yalc
```

Build and publish locally. This should be done inside the particular package's folder.

```
# package: @harness/uicore
# dir: packages/uicore
yarn build && yalc publish
```

You'll see the published version like `@harness/uicore@0.1.256 published in store.`

Install it in nextgenui

```
yalc add @harness/uicore@0.1.256
```

Note: The version number must match to whatever was printed on the screen during publish.

Please do not commit any changes made by `yalc` in nextgenui.

## Publish

Publishing is done using Harness CI and stored in [Harness GitHub Package Registry](https://github.com/orgs/harness/packages).

As soon as the PR is merged into master, a new release will be built and published into [Harness GitHub Package Registry](https://github.com/orgs/harness/packages).

## Updating Image Snapshots

Run the following to update the Storybook Image Snapshots:

```sh
yarn run build-storybook && yarn run do-puppeteer-storyshots -u
```

> note: You might want to set `PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` on MacOS

Documentation is published at [uicore.harness.io](http://uicore.harness.io/).
