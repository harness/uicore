#!/bin/bash

#
# This script cleans up all running uikit pods
#

pods=$(kubectl get pods --namespace=jenkins | grep "^uikit-" | awk '{ print $1 }')

for pod in $pods; do
  kubectl --namespace=jenkins delete pod $pod;
done
