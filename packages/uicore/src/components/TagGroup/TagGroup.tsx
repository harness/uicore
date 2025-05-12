/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { ITagProps, Popover } from '@blueprintjs/core'
import { Tag, Intent } from '../Tag/Tag'
import { Text } from '../Text/Text'
import css from './TagGroup.css'

export interface TagItem {
  text: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}

type TagItemOrString = TagItem | string

interface TagGroupProps {
  tags: TagItemOrString[]
  className?: string
  tagProps?: ITagProps
}

// Helper function to normalize tag items
const normalizeTag = (tag: TagItemOrString): TagItem => {
  if (typeof tag === 'string') {
    return { text: tag }
  }
  return tag
}

// Helper to get the appropriate Intent based on tag type
const getTagIntent = (type?: string): Intent | undefined => {
  switch (type) {
    case 'primary':
      return Intent.PRIMARY
    case 'success':
      return Intent.SUCCESS
    case 'warning':
      return Intent.WARNING
    case 'danger':
      return Intent.DANGER
    default:
      return undefined
  }
}

export const TagGroup = ({ tags, className = '', tagProps }: TagGroupProps): React.ReactElement => {
  if (!tags || tags.length === 0) return <></>

  const normalizedTags = tags.map(normalizeTag)
  const remainingTags = normalizedTags.length - 1
  const firstTag = normalizedTags[0]
  const otherTags = normalizedTags.slice(1)

  return (
    <div className={css.tagGroup}>
      <Tag className={cx(className)} intent={getTagIntent(firstTag.type)} {...tagProps}>
        {firstTag.text}
      </Tag>
      {remainingTags > 0 && (
        <Popover
          interactionKind="hover"
          content={
            <div className={css.popoverContent}>
              {otherTags.map((tag, index) => (
                <Tag
                  className={cx(className)}
                  key={`${tag.text}-${index}`}
                  intent={getTagIntent(tag.type)}
                  {...tagProps}>
                  {tag.text}
                </Tag>
              ))}
            </div>
          }>
          <Text font={'small'} className={cx(css.bgBlue, css.tag)}>
            +{remainingTags}
          </Text>
        </Popover>
      )}
    </div>
  )
}
