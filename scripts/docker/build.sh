#!/bin/bash
# Copyright 2020 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

set -e

TAG=uikit

echo "Building docker image with tag " $TAG "..."
docker build -t $TAG .

echo "Tag and push..."
docker tag $TAG us.gcr.io/platform-205701/$TAG
docker push us.gcr.io/platform-205701/$TAG
