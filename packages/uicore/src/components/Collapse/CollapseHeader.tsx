/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color } from '@harness/design-system'
import { Icon, IconProps, IconName } from '@harness/icons'
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
