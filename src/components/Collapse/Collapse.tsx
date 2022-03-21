/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useCallback } from 'react'
import { ICollapseProps, Collapse as BpCollapse } from '@blueprintjs/core'
import css from './Collapse.css'
import { CollapseHeader, CollapseHeaderProps } from './CollapseHeader'
import cx from 'classnames'

interface CollapseProps extends ICollapseProps, Omit<CollapseHeaderProps, 'onToggleOpen' | 'isOpen'> {
  isOpen?: boolean
  children?: React.ReactNode
  onToggleOpen?: (isOpen: boolean) => void
  collapseClassName?: string
  collapseHeaderClassName?: string
}

function Collapse(props: CollapseProps) {
  const {
    onRemove,
    isOpen: propsIsOpen,
    isRemovable,
    heading,
    expandedHeading,
    iconProps,
    expandedIcon,
    collapsedIcon,
    collapseClassName,
    collapseHeaderClassName,
    onToggleOpen,
    ...rest
  } = props
  const [isOpen, setIsOpen] = useState(propsIsOpen ?? false)
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
    onToggleOpen?.(!isOpen)
  }, [isOpen, onToggleOpen])

  React.useEffect(() => {
    setIsOpen(propsIsOpen ?? false)
  }, [propsIsOpen])

  return (
    <div className={cx(css.main, collapseClassName)}>
      <CollapseHeader
        onToggleOpen={handleClick}
        onRemove={onRemove}
        isOpen={isOpen}
        isRemovable={isRemovable}
        heading={heading}
        expandedHeading={expandedHeading}
        iconProps={iconProps}
        expandedIcon={expandedIcon}
        className={cx(css.header, collapseHeaderClassName)}
        collapsedIcon={collapsedIcon}
      />
      <div className={css.collapse}>
        <BpCollapse {...rest} isOpen={isOpen}>
          {props.children}
        </BpCollapse>
      </div>
    </div>
  )
}

export { Collapse, CollapseProps }
