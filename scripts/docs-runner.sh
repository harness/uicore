# Disable NextJS tracking
export NEXT_TELEMETRY_DISABLED=1

npm install -g yarn

echo "Starting documentation service..."
cd $1
yarn start
