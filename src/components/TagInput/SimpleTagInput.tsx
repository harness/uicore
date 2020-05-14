import React, { useCallback } from 'react'
import { TagInput, TagInputProps } from './TagInput'

export function SimpleTagInput(props: Omit<TagInputProps<string>, 'labelFor' | 'keyOf'>) {
  const labelFor = useCallback((item: string) => item, [])
  const itemFromNewTag = useCallback((newTag: string) => newTag, [])

  return (
    <TagInput items={props.items} {...props} keyOf={labelFor} labelFor={labelFor} itemFromNewTag={itemFromNewTag} />
  )
}
