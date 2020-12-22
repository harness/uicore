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
