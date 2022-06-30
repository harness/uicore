/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
