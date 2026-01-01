/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { I18nResource } from '@harness/design-system'
import { Popover, PopoverPosition } from '@blueprintjs/core'
import { Icon } from '@harness/icons'
import cx from 'classnames'

import { MultiTypeInputType, MultiTypeIcon as TypeIcon, MultiTypeIconSize as TypeIconSize } from './MultiTypeInputUtils'

import { Button, ButtonVariation } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { ICustomExpressionInputContext } from '../CustomExpressionInput/CustomExpressionInputContext'

import css from './MultiTypeInput.css'

const ExpressionHelperText = (
  <React.Fragment>
    <b>Expressions</b> allow you to use Harness input, output, and execution variables in a setting.
  </React.Fragment>
)
const helperText = {
  [MultiTypeInputType.EXPRESSION]: ExpressionHelperText,
  // for fallback value and typesafety
  [MultiTypeInputType.CUSTOM_EXPRESSION]: ExpressionHelperText,
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

export const labels = {
  [MultiTypeInputType.EXPRESSION]: 'expression',
  // for fallback value and typesafety
  [MultiTypeInputType.CUSTOM_EXPRESSION]: 'expression',
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
  customPopoverInfo?: ICustomExpressionInputContext['popoverInfo']
  setDontShowAgain(val: boolean): void
  setIsLearnMoreOpen(val: boolean): void
}

export function LearnMorePopover(props: LearnMorePopoverProps): React.ReactElement {
  const { i18n, type, isLearnMoreOpen, dontShowAgain, customPopoverInfo, setDontShowAgain, setIsLearnMoreOpen } = props

  const labelText = customPopoverInfo ? customPopoverInfo?.label : i18n[labels[type]]
  const helperTextValue = customPopoverInfo ? customPopoverInfo?.helperText : helperText[type]

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    if ((e.target as HTMLInputElement).checked) {
      setDontShowAgain(true)
      setIsLearnMoreOpen(false)
    }
  }

  const { className: iconClassName, ...iconProps } = customPopoverInfo?.iconProps || {}

  const popoverContent = (
    <div onClick={e => e.stopPropagation()}>
      <div className={css.learnMore}>
        <span>{typeof i18n.learnMore === 'function' ? i18n.learnMore() : i18n.learnMore}</span>
        <Button icon="cross" onClick={() => setIsLearnMoreOpen(false)} variation={ButtonVariation.ICON} />
      </div>
      <div className={css.body}>
        <div className={css.content}>
          <Icon name={TypeIcon[type]} data-type={type} size={TypeIconSize[type] * 1.8} {...iconProps} />
          <span>{helperTextValue}</span>
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
        <span className={css.menuItemLabel}>{typeof labelText === 'function' ? labelText() : labelText}</span>
        <Icon
          className={cx(css.menuItemIcon, css[type], iconClassName)}
          name={TypeIcon[type]}
          size={TypeIconSize[type]}
          {...iconProps}
        />
      </div>
    </Popover>
  )
}
