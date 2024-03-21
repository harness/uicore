#!/usr/bin/env bash
# Copyright (c) Harness Inc.
#
# This source code is licensed under the Apache 2.0 license found in the
# LICENSE file in the root directory of this source tree.

SCRIPT_DIR=$(dirname "$0")

STAGED_FILES=$(tr ' ' '\n' <<< "$@")

while read -r filepath; do
  "$SCRIPT_DIR"/add_license_header.sh -l "$SCRIPT_DIR/.license-header-apache-2-0.txt" -f "$filepath"
done <<< "$STAGED_FILES"
