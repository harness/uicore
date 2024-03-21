#!/usr/bin/env bash
# Copyright (c) Harness Inc.
#
# This source code is licensed under the Apache 2.0 license found in the
# LICENSE file in the root directory of this source tree.

# Check if directory argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Store the directory path
directory="$1"

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory not found: $directory"
    exit 1
fi

# Define the patterns to remove and lines to include
patterns_to_remove=(
    'Copyright [0-9][0-9][0-9][0-9] Harness Inc. All rights reserved.'
    'Use of this source code is governed by the PolyForm Shield 1.0.0 license'
    'that can be found in the licenses directory at the root of this repository, also available at'
    'https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.'
)

# Use find command to recursively search for files in the directory
find "$directory" -type f -print0 | while IFS= read -r -d '' file; do
    # Temporary file to store modified content
    temp_file=$(mktemp)

    # Flag to check if the current line should be removed
    remove_line=false

    # Read each line of the file
    while IFS= read -r line; do
        # Check if the line matches any pattern to remove
        for pattern in "${patterns_to_remove[@]}"; do
            if [[ "$line" =~ $pattern ]]; then
                remove_line=true
                break
            fi
        done

        # Write line to temporary file if not flagged for removal
        if ! $remove_line; then
            echo "$line" >> "$temp_file"
        fi

        # Reset the flag after processing the line
        remove_line=false
    done < "$file"

    # Replace original file with modified content
    mv "$temp_file" "$file"
    echo "Removed specified lines from: $file"
done

echo "Script execution completed."
