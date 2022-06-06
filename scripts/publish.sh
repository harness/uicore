#!/bin/bash
# Copyright 2022 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

set -ex
node -v

export NODE_OPTIONS="--max-old-space-size=4096"

# configure git
git config --global user.email "bot@harness.io"
git config --global user.name "bot-harness"
git remote set-url origin "https://${GIT_BOT_TOKEN}@github.com/harness/uicore-test.git"
git fetch --tags

# Set up Github Package Registry token
echo @harness:registry=https://npm.pkg.github.com > .npmrc
echo "//npm.pkg.github.com/:_authToken="$GIT_BOT_TOKEN >> .npmrc
echo always-auth=true >> .npmrc
BASE_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

CHANGED=$(npx lerna changed)

if [[ "$(echo $CHANGED | wc -l)" -gt 0 ]]
then
    echo $CHANGED
    yarn build
    yarn release minor --yes --ignore-scripts
    git pull origin $BASE_BRANCH --rebase
    git push origin $BASE_BRANCH --follow-tags --force
else
    echo "No changes!"
fi
