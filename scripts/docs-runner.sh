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
