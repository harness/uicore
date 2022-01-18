# Copyright 2020 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

# Disable NextJS tracking
export NEXT_TELEMETRY_DISABLED=1

service nginx start

npm install -g yarn

echo "Starting documentation service..."
cd $1

echo @wings-software:registry=https://npm.pkg.github.com > ~/.npmrc
echo $2 >> ~/.npmrc
echo always-auth=true >> ~/.npmrc

yarn start
