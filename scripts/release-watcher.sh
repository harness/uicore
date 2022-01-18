# Copyright 2019 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

#
# This script is used in Jenkins' uikit-watcher to watch for git
# pushes. If a version change happens in package.json and there is
# no release for it, the job triggers a downstream job (uikit-release)
# to build a new release.
#
# When this script exits with status 1, the downstream job is not triggered.

VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
RELEASE_EXISTS=$(git branch -r | grep "origin/v$VERSION" | wc -l)
HAS_CHANGELOG=$(cat CHANGELOG.md | grep "$VERSION" | wc -l)

if [ $RELEASE_EXISTS -ne 0 ]; then
  echo "Release exists. Doing nothing."
  exit 1
else
  if [ $HAS_CHANGELOG -ne 0 ]; then
    echo "Trigger new release build for v$VERSION..."
  else
    echo "CHANGELOG does not have description for version v$VERSION. ABORTED."
    exit 1
  fi
fi
