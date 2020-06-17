import React from 'react'
import { Button, ButtonProps } from '../Button/Button'
import { Collapse as BpCollapse, ICollapseProps } from '@blueprintjs/core'
import { CollapseHeader, CollapseHeaderProps } from './CollapseHeader'
import { Container } from '../Container/Container'
import cx from 'classnames'
import css from './CollapseListPanel.css'

interface ListPanelInterface {
  isOpen?: boolean
  onToggleOpen?: (isOpen?: boolean) => void
  openNext?: () => Promise<void> | void
}

type CollapseListPanelHeaderProps = Omit<CollapseHeaderProps, 'isOpen' | 'onToggleOpen'>

interface CollapseListPanelProps extends ListPanelInterface {
  nextButtonProps?: ButtonProps
  footerContent?: JSX.Element
  nextButtonText?: string
  className?: string
  bpCollapseProps?: ICollapseProps
  collapseHeaderProps?: CollapseListPanelHeaderProps
}

const CollapseListPanel: React.FC<CollapseListPanelProps> = props => {
  const {
    openNext,
    onToggleOpen,
    nextButtonText,
    footerContent,
    className,
    collapseHeaderProps,
    bpCollapseProps,
    nextButtonProps,
    isOpen
  } = props
  return (
    <Container className={cx(css.main, className)}>
      <CollapseHeader {...collapseHeaderProps} isOpen={isOpen || false} onToggleOpen={onToggleOpen || (() => null)} />
      <Container className={css.collapse}>
        <BpCollapse {...bpCollapseProps} isOpen={isOpen}>
          {props.children}
          <Container className={css.footerContent}>
            <Button {...nextButtonProps} onClick={openNext}>
              {nextButtonText || 'Next'}
            </Button>
            {footerContent}
          </Container>
        </BpCollapse>
      </Container>
    </Container>
  )
}

export { CollapseListPanel, CollapseListPanelProps, ListPanelInterface }
