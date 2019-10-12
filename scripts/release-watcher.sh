#
# This script is used in Jenkins' uikit-watcher to watch for git
# pushes. If a version change happens in package.json and there is
# no release for it, the job triggers a downstream job (uikit-release)
# to build a new release.
#
# When this script exits with status 1, the downstream job is not triggered.

VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
RELEASE_EXISTS=$(git branch -r | grep "origin/release/$VERSION" | wc -l)

if [ $RELEASE_EXISTS -ne 0 ]; then
  echo "Release exists. Doing nothing."
  exit 1
else
  echo "Trigger new release build for v$VERSION..."
fi