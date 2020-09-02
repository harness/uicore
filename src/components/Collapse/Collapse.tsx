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

  return (
    <div className={cx(css.main, collapseClassName)}>
      <CollapseHeader
        onToggleOpen={handleClick}
        onRemove={onRemove}
        isOpen={isOpen}
        isRemovable={isRemovable}
        heading={heading}
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
