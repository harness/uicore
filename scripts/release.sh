# Disable NextJS tracking
export NEXT_TELEMETRY_DISABLED=1

# Get version from package.json
export VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)

# Exit when any command fails
set -e

# GITHUB_HARNESS_BOT_TOKEN is secret from Jenkins
echo $GITHUB_HARNESS_BOT_TOKEN > ~/.npmrc

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