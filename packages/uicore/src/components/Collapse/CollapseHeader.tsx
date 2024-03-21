/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Color } from '@harnessio/design-system'
import { Icon, IconProps, IconName } from '@harnessio/icons'
import css from './CollapseHeader.css'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import cx from 'classnames'

export interface CollapseHeaderProps {
  isOpen: boolean
  collapsedIcon?: IconName
  expandedIcon?: IconName
  iconProps?: IconProps
  heading?: string | JSX.Element
  expandedHeading?: string | JSX.Element
  isRemovable?: boolean
  onRemove?: () => void
  className?: string
  onToggleOpen: (isOpen?: boolean) => void
}

export function CollapseHeader(props: CollapseHeaderProps) {
  const {
    onToggleOpen,
    onRemove,
    isOpen,
    isRemovable,
    heading,
    expandedHeading,
    iconProps,
    expandedIcon,
    collapsedIcon,
    className
  } = props
  return (
    <Container className={cx(css.main, className)}>
      <Container className={css.leftSection} onClick={() => onToggleOpen(!isOpen)}>
        {isOpen ? (
          <Icon name={expandedIcon || 'main-caret-down'} color={Color.GREY_400} size={10} {...iconProps} />
        ) : (
          <Icon name={collapsedIcon || 'main-caret-right'} color={Color.GREY_400} size={10} {...iconProps} />
        )}
        {isOpen && expandedHeading ? (
          typeof expandedHeading === 'string' ? (
            <Text className={css.title}>{expandedHeading}</Text>
          ) : (
            expandedHeading
          )
        ) : typeof heading === 'string' ? (
          <Text className={css.title}>{heading}</Text>
        ) : (
          heading
        )}
      </Container>

      <Container>
        {isRemovable && <Button icon="main-close" minimal onClick={onRemove} iconProps={{ size: 10 }} />}
      </Container>
    </Container>
  )
}
