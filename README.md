This repository contains implementation of [Next Generation UI Architecture](https://docs.google.com/document/d/1oe_cHcDyYhwjJ6QZqyOIlpUWGgYyeCIBfUOdElg2rBg/edit#heading=h.41cp29fl3vvn) combined with an integrated playable documentation system.

## Local development

`yarn start`

Then navigate to [http://localhost:3000](http://localhost:3000) to see the integrated documentation system.

## Build

`yarn build`

## Publish

Publishing is done using Jenkins and stored in [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages). To cut a release, follow these steps:

- Create a new branch out of `master`, for example `release-v1.0.2`.
- Run `git diff v1.0.1..release-v1.0.2` (assuming current release is `v1.0.1`) to see all the changes that makes to the new release.
- Construct a change list in `CHANGELOG.md`. Note that you should put major changes in the CHANGLOG and not every commit logs.
- Update version in `package.json`, in this case `1.0.2`.
- Commit changes to `CHANGELOG.md` and `package.json` and create a PR to merge into master.
- Get approvals and merge the PR into master. Delete the intermediate branch `release-v1.0.2`.

As soon as the PR is merged into master, a new release will be built and published into [Harness GitHub Package Registry](https://github.com/orgs/wings-software/packages).
