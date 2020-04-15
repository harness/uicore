#!/bin/bash

set -e

TAG=uikit

echo "Building docker image with tag " $TAG "..."
docker build -t $TAG .

echo "Tag and push..."
docker tag $TAG us.gcr.io/platform-205701/$TAG
docker push us.gcr.io/platform-205701/$TAG
