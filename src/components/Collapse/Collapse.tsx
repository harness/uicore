import React, { useState } from 'react'
import { ICollapseProps, Collapse as BpCollapse } from '@blueprintjs/core'
import { Icon } from '../../icons/Icon'
import css from './Collapse.css'

interface CollapseProps extends ICollapseProps {
  isOpen: boolean
  collapsedIcon?: string
  expandedIcon?: string
  iconProps?: any
  heading?: string | JSX.Element
  isRemovable?: boolean
  onRemove?: () => void
  children?: React.ReactNode
}

function Collapse(props: Props) {
  const [isOpen, setIsOpen] = useState(props.isOpen)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={css.main}>
      <div className={css.header}>
        <span className={css.leftSection} onClick={handleClick}>
          {isOpen ? (
            <Icon name={props.expandedIcon || 'main-caret-down'} color={'grey400'} size={15} {...props.iconProps} />
          ) : (
            <Icon name={props.collapsedIcon || 'main-caret-right'} color={'grey400'} size={15} {...props.iconProps} />
          )}
          <span className={css.title}> {props.heading} </span>
        </span>

        <span className={css.rightSection}>
          <a>
            {props.isRemovable ? (
              <Icon
                name={'main-close'}
                size={12}
                onClick={() => {
                  if (props.onRemove) {
                    props.onRemove()
                  }
                }}
              />
            ) : null}
          </a>
        </span>
      </div>
      <div className={css.collapse}>
        <BpCollapse {...props} isOpen={isOpen}>
          {props.children}
        </BpCollapse>
      </div>
    </div>
  )
}

export { Collapse, CollapseProps }
