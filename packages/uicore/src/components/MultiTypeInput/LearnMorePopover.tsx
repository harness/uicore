/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { I18nResource } from '@harnessio/design-system'
import { Popover, PopoverPosition } from '@blueprintjs/core'
import { Icon } from '@harnessio/icons'
import cx from 'classnames'

import { MultiTypeInputType, MultiTypeIcon as TypeIcon, MultiTypeIconSize as TypeIconSize } from './MultiTypeInputUtils'

import { Button, ButtonVariation } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'

import css from './MultiTypeInput.css'

const helperText: Record<MultiTypeInputType, React.ReactNode> = {
  [MultiTypeInputType.EXPRESSION]: (
    <React.Fragment>
      <b>Expressions</b> allow you to use Harness input, output, and execution variables in a setting.
    </React.Fragment>
  ),
  [MultiTypeInputType.FIXED]: (
    <React.Fragment>
      <b>Fixed Values</b> are simply values that you enter manually when you configure a setting and do not change at
      runtime.
    </React.Fragment>
  ),
  [MultiTypeInputType.RUNTIME]: (
    <React.Fragment>
      <b>Runtime Inputs</b> are placeholders for values that will be provided when you start a Pipeline execution.
    </React.Fragment>
  ),
  [MultiTypeInputType.RUNTIMEV1]: (
    <React.Fragment>
      <b>Runtime Inputs</b> are placeholders for values that will be provided when you start a Pipeline execution.
    </React.Fragment>
  ),
  [MultiTypeInputType.EXECUTION_TIME]: (
    <React.Fragment>
      <b>Execution Inputs</b> are placeholders for values that must be provided when manually initiating a pipeline
      execution, when triggering it, and when certain steps require inputs when the pipeline is running.
    </React.Fragment>
  ),
  [MultiTypeInputType.REGEX]: (
    <React.Fragment>
      A <b>RegEx</b> (Regular Expression) allows you specify a text pattern that will be matched against, following a
      standardized syntax.
    </React.Fragment>
  )
}

export const labels: Record<MultiTypeInputType, string> = {
  [MultiTypeInputType.EXPRESSION]: 'expression',
  [MultiTypeInputType.FIXED]: 'fixedValue',
  [MultiTypeInputType.RUNTIME]: 'runtimeInput',
  [MultiTypeInputType.RUNTIMEV1]: 'runtimeInput',
  [MultiTypeInputType.EXECUTION_TIME]: 'executionTimeInput',
  [MultiTypeInputType.REGEX]: 'regex'
}

export interface LearnMorePopoverProps {
  i18n: I18nResource
  type: MultiTypeInputType
  isLearnMoreOpen: boolean
  dontShowAgain: boolean
  setDontShowAgain(val: boolean): void
  setIsLearnMoreOpen(val: boolean): void
}

export function LearnMorePopover(props: LearnMorePopoverProps): React.ReactElement {
  const { i18n, type, isLearnMoreOpen, dontShowAgain, setDontShowAgain, setIsLearnMoreOpen } = props

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    if ((e.target as HTMLInputElement).checked) {
      setDontShowAgain(true)
      setIsLearnMoreOpen(false)
    }
  }

  const popoverContent = (
    <div onClick={e => e.stopPropagation()}>
      <div className={css.learnMore}>
        <span>{i18n.learnMore}</span>
        <Button icon="cross" onClick={() => setIsLearnMoreOpen(false)} variation={ButtonVariation.ICON} />
      </div>
      <div className={css.body}>
        <div className={css.content}>
          <Icon name={TypeIcon[type]} data-type={type} size={TypeIconSize[type] * 1.8} />
          <span>{helperText[type]}</span>
        </div>

        {dontShowAgain ? null : (
          <div className={css.checkbox}>
            <Checkbox checked={dontShowAgain} onChange={handleChange} label="Don't show again" />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Popover
      isOpen={isLearnMoreOpen}
      content={popoverContent}
      minimal
      position={PopoverPosition.LEFT}
      popoverClassName={css.learnMorePopover}
      className={css.learnMoreWrapper}
      modifiers={{ offset: { offset: '0px 0px' }, arrow: { enabled: false } }}>
      <div className={css.menuItem}>
        <span className={css.menuItemLabel}>{i18n[labels[type]]}</span>
        <Icon className={cx(css.menuItemIcon, css[type])} name={TypeIcon[type]} size={TypeIconSize[type]} />
      </div>
    </Popover>
  )
}
