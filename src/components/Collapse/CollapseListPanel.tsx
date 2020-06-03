import React from 'react'
import { Button } from '../Button/Button'
import { Collapse as BpCollapse, ICollapseProps } from '@blueprintjs/core'
import { CollapseHeader, CollapseHeaderProps } from './CollapseHeader'
import { Container } from '../Container/Container'
import cx from 'classnames'
import css from './CollapseListPanel.css'

interface CollapseListPanelProps extends Omit<CollapseHeaderProps, 'isOpen'>, ICollapseProps {
  openNext?: () => Promise<void> | void
  nextButtonText?: string
  isOpen?: boolean
  footerContent?: JSX.Element
  className?: string
}

const CollapseListPanel: React.FC<CollapseListPanelProps> = props => {
  const { openNext, nextButtonText, footerContent, className, ...rest } = props
  const {
    isOpen,
    collapsedIcon,
    expandedIcon,
    iconProps,
    heading,
    isRemovable,
    onRemove,
    onToggleOpen,
    ...bpProps
  } = rest
  return (
    <Container className={cx(css.main, className)}>
      <CollapseHeader
        isOpen={isOpen || false}
        collapsedIcon={collapsedIcon}
        expandedIcon={expandedIcon}
        iconProps={iconProps}
        heading={heading}
        isRemovable={isRemovable}
        onRemove={onRemove}
        onToggleOpen={onToggleOpen}
      />
      <Container className={css.collapse}>
        <BpCollapse {...bpProps} isOpen={isOpen}>
          {props.children}
          <Container className={css.footerContent}>
            <Button onClick={openNext}>{nextButtonText || 'Next'}</Button>
            {footerContent}
          </Container>
        </BpCollapse>
      </Container>
    </Container>
  )
}

export { CollapseListPanel, CollapseListPanelProps }
