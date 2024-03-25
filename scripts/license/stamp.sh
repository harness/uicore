#!/usr/bin/env bash
# Copyright 2024 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

SCRIPT_DIR=$(dirname "$0")

STAGED_FILES=$(tr ' ' '\n' <<< "$@")

while read -r filepath; do
  if [[ $filepath == *"/packages/uicore"* || $filepath == *"/packages/icons"* ]]; then
    LICENSE_HEADER_FILE="$SCRIPT_DIR/.license-header-apache-2-0.txt"
  else
    LICENSE_HEADER_FILE="$SCRIPT_DIR/.license-header-polyform-shield.txt"
  fi

  "$SCRIPT_DIR"/add_license_header.sh -l "$LICENSE_HEADER_FILE" -f "$filepath"
done <<< "$STAGED_FILES"
