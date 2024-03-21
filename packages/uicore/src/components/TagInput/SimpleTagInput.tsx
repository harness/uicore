/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback } from 'react'
import { TagInput, TagInputProps } from './TagInput'

export function SimpleTagInput(
  props: Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
) {
  const labelFor = useCallback(
    (item: string | { label: string; value: string }) => (typeof item === 'string' ? item : item.value),
    []
  )
  const itemFromNewTag = useCallback((newTag: string) => newTag, [])

  return (
    <TagInput {...props} items={props.items} keyOf={labelFor} labelFor={labelFor} itemFromNewTag={itemFromNewTag} />
  )
}
