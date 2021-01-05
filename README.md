This repository contains implementation of [Next Generation UI Architecture](https://docs.google.com/document/d/1oe_cHcDyYhwjJ6QZqyOIlpUWGgYyeCIBfUOdElg2rBg/edit#heading=h.41cp29fl3vvn) combined with an integrated playable documentation system.

## Local development

- `yarn setup` - to set up authentication to access Github Package Registry
- `yarn start` - to start local build

Then navigate to [http://localhost:3000](http://localhost:3000) to see the integrated documentation system.

## Build

`yarn build`

## Publish

Publishing is done using Github Actions and stored in [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).

As soon as the PR is merged into master, a new release will be built and published into [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).
