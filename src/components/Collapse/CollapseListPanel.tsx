/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
