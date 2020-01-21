DOCROOT=/jenkins-storage/ui/uikit/v$VERSION
mkdir -p $DOCROOT
cp -R * $DOCROOT

gcloud auth activate-service-account $UI_JENKINS_GCP_SERVICE_ACCOUNT_ID --key-file $UI_JENKINS_GCP_SERVICE_ACCOUNT_TOKEN --project $PLATFORM_GCP_PROJECT_ID
gcloud container clusters get-credentials jenkins-private --zone us-west1-b --project $PLATFORM_GCP_PROJECT_ID

bash $DOCROOT/scripts/docs-cleanup.sh

cat $DOCROOT/scripts/uikit.yaml | envsubst | kubectl create --namespace=jenkins -f -

# Hit documentation site once to force NextJS cache so we can browse faster later on
# Note: For some reason, pod from GCP is not able to access https://uikit.harness.io. Disable for now.
# curl --retry 30 --retry-connrefuse --retry-max-time 500 --retry-delay 15 https://uikit.harness.io/ && true