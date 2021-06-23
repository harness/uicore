This repository contains implementation of [Next Generation UI Architecture](https://docs.google.com/document/d/1oe_cHcDyYhwjJ6QZqyOIlpUWGgYyeCIBfUOdElg2rBg/edit#heading=h.41cp29fl3vvn).

## Local development

- `yarn setup` - to set up authentication to access Github Package Registry
- `yarn storybook` - to start storybook
- `yarn ui:icons` - to build icons, run this command after placing your icon svg inside `src/icons/` directory

Then navigate to [http://localhost:6006](http://localhost:6006) to see storybook.

You can also use `yalc` package for development with nextgen ui

Install it globally

```
yarn global add yalc
```

Build and publish locally

```
yalc publish
```

You'll see the published version like `@wings-software/uicore@0.1.256 published in store.`

Install it in nextgenui

```
yalc add @wings-software/uicore@0.1.256
```

Note: The version number must match to whatever was printed on the screen during publish.

## Build

`yarn build`

## Publish

Publishing is done using Github Actions and stored in [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).

As soon as the PR is merged into master, a new release will be built and published into [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).

Documentation is published at [uicore.harness.io](http://uicore.harness.io/).
