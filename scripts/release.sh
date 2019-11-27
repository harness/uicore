# Disable NextJS tracking
export NEXT_TELEMETRY_DISABLED=1

# Get version from package.json
export VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)

# Exit when any command fails
set -e

echo @wings-software:registry=https://npm.pkg.github.com > ~/.npmrc
# GITHUB_HARNESS_BOT_TOKEN is a secret line from Jenkins (npm.pkg.github.com/:_authToken=XXX)
echo $GITHUB_HARNESS_BOT_TOKEN >> ~/.npmrc
echo always-auth=true >> ~/.npmrc

# Create a new branch like v1.0.1
git checkout -b v$VERSION

# Build
yarn build

# Force adding ./dist into git because it's in .gitignore
git add -f ./dist/*
git commit . -m"Release version: v$VERSION"

# mkdir -p /jenkins-storage/ui/uikit/$NEW_VERSION
# cp -R ./* /jenkins-storage/ui/uikit/$NEW_VERSION

# This is for Jenkins to set environmen variables
echo "VERSION=$VERSION" > build.properties

echo "Publishing... v$VERSION"
npm publish