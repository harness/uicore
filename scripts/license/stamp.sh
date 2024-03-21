#!/usr/bin/env bash
# Copyright (c) Harness Inc.
#
# This source code is licensed under the Apache 2.0 license found in the
# LICENSE file in the root directory of this source tree.

# Copyright 2022 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

SCRIPT_DIR=$(dirname "$0")

STAGED_FILES=$(tr ' ' '\n' <<< "$@")

while read -r filepath; do
  "$SCRIPT_DIR"/add_license_header.sh -l "$SCRIPT_DIR/.license-header-apache-2-0.txt" -f "$filepath"
done <<< "$STAGED_FILES"
