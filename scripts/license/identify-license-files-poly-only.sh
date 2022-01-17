#!/bin/bash
# Copyright 2022 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Shield 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.

# Produces source files intended for use with add_license_header.sh
# It produces a file containing the source files which should be stamped with the license header.
#   sources-all.txt
#

BASEDIR=$(dirname $0)

SUPPORTED_EXTENSIONS_FILE="$BASEDIR/.license-extensions.txt"

FILE_EXTENSIONS=$(awk 'NR>1 {print $1}' "$SUPPORTED_EXTENSIONS_FILE" | paste -s -d '|' -)

###############################
## Polyform Shield           ##
###############################

# find all files which should receive header
find . -type f -not -path "*/node_modules/*" | grep -E "\.($FILE_EXTENSIONS)$" | cut -c 3- | sort -f | uniq -i > sources-all.txt

###############################
## Compute Counts            ##
###############################

# sanity check file counts
FILE_COUNT=$(wc -l sources-all.txt)

# print file and line counts
echo "File Count:"
echo "$FILE_COUNT"
echo
echo "Line Count:"
LINE_COUNT=$(cat sources-all.txt | tr \\n \\0 | xargs -0 wc -l | grep total | awk '{print $1}' | paste -s -d '+' - | bc)
printf "%8d total\n" "$(echo $LINE_COUNT)"
