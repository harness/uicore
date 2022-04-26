This repo contains code used in the [Harness CD Community Edition](https://github.com/harness/harness-cd-community) which is licensed under the [PolyForm Shield License 1.0.0](./licenses/PolyForm-Shield-1.0.0.txt). This repo also contains code belonging to Harness CD Enterprise Plan which is licensed under the [PolyForm Free Trial License 1.0.0](./licenses/PolyForm-Free-Trial-1.0.0.txt). You may obtain a copy of these licenses in the [licenses](./licenses/) directory at the root of this repository.

This repository contains implementation of [Next Generation UI Architecture](https://docs.google.com/document/d/1oe_cHcDyYhwjJ6QZqyOIlpUWGgYyeCIBfUOdElg2rBg/edit#heading=h.41cp29fl3vvn).

## Local development

- `yarn setup` - to set up authentication to access Github Package Registry
- `yarn storybook` - to start storybook

## Icons

Icons are moved to a separate npm package under /packages folder. Please follow below steps to add new icons -

- Go to `packages/icons`
- Place your svg file inside `src` directory
- Run `yarn ui:icons` to build icons.

## Storybook

`yarn storybook` - to start storybook

Then navigate to [http://localhost:6006](http://localhost:6006) to see storybook.

You can also use `yalc` package for development with nextgen ui

Install it globally

```
yarn global add yalc
```

Build and publish locally

```
yarn build && yalc publish
```

You'll see the published version like `@harness/uicore@0.1.256 published in store.`

Install it in nextgenui

```
yalc add @harness/uicore@0.1.256
```

Note: The version number must match to whatever was printed on the screen during publish.

Please do not commit any changes made by `yalc` in nextgenui.

## Build

`yarn build`

## Publish

Publishing is done using Github Actions and stored in [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).

As soon as the PR is merged into master, a new release will be built and published into [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).

## Updating Image Snapshots

Run the following to update the Storybook Image Snapshots:

```sh
yarn run build-storybook && yarn run do-puppeteer-storyshots -u
```

Documentation is published at [uicore.harness.io](http://uicore.harness.io/).
