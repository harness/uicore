import React, { useState, useCallback } from 'react'
import { ICollapseProps, Collapse as BpCollapse } from '@blueprintjs/core'
import css from './Collapse.css'
import { CollapseHeader, CollapseHeaderProps } from './CollapseHeader'

interface CollapseProps extends ICollapseProps, Omit<CollapseHeaderProps, 'onToggleOpen'> {
  isOpen: boolean
  children?: React.ReactNode
}

function Collapse(props: CollapseProps) {
  const { onRemove, isOpen: propsIsOpen, isRemovable, heading, iconProps, expandedIcon, collapsedIcon } = props
  const [isOpen, setIsOpen] = useState(propsIsOpen)
  const handleClick = useCallback(() => setIsOpen(!isOpen), [isOpen])

  return (
    <div className={css.main}>
      <CollapseHeader
        onToggleOpen={handleClick}
        onRemove={onRemove}
        isOpen={isOpen}
        isRemovable={isRemovable}
        heading={heading}
        iconProps={iconProps}
        expandedIcon={expandedIcon}
        className={css.header}
        collapsedIcon={collapsedIcon}
      />
      <div className={css.collapse}>
        <BpCollapse {...props} isOpen={isOpen}>
          {props.children}
        </BpCollapse>
      </div>
    </div>
  )
}

export { Collapse, CollapseProps }
