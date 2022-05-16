/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Text, Popover, Layout, Container, Tag } from '../../'
import { IPopoverProps, PopoverInteractionKind } from '@blueprintjs/core'
import { Icon, IconProps } from '@harness/icons'
import type { tagsType } from '../../utils/tagTypes'
import i18n from './TagsPopover.i18n'
import css from './TagsPopover.css'

export interface ListTagsProps {
  className?: string
  tags: tagsType
  tagClassName?: string
  target?: React.ReactElement
  popoverProps?: IPopoverProps
  iconProps?: Omit<IconProps, 'name'>
}

export const TagsPopover: React.FC<ListTagsProps> = props => {
  const { tags, target, tagClassName, popoverProps, iconProps, className } = props
  return (
    <Popover interactionKind={PopoverInteractionKind.HOVER} {...popoverProps}>
      {target || (
        <Layout.Horizontal className={className} flex={{ align: 'center-center' }} spacing="xsmall">
          <Icon name="main-tags" {...iconProps} size={iconProps?.size || 15} />
          <Text>{Object.keys(tags).length}</Text>
        </Layout.Horizontal>
      )}
      <Container padding="small">
        <Text font={{ size: 'small', weight: 'bold' }}>{i18n.tags}</Text>
        <Container className={css.tagsPopover}>
          {Object.keys(tags).map(key => {
            const value = tags[key]
            return (
              <Tag className={cx(css.tag, tagClassName)} key={key}>
                {value ? `${key}:${value}` : key}
              </Tag>
            )
          })}
        </Container>
      </Container>
    </Popover>
  )
}
