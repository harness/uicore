/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { isEmpty } from 'lodash-es'
import cx from 'classnames'
import { Classes, Intent, PopoverInteractionKind, Position } from '@blueprintjs/core'
import { Icon, IconName } from '@harness/icons'
import { Popover } from '../Popover/Popover'
import css from './PillToggle.css'

export interface PillToggleOption<T> {
  label: string
  value: T
}

export interface PillToggleProps<T> {
  selectedView: T
  options: [PillToggleOption<T>, PillToggleOption<T>]
  onChange: (val: T) => void
  disableToggle?: boolean
  className?: string
  disableToggleReasonIcon?: IconName
  showDisableToggleReason?: boolean
  disableToggleReasonContent?: React.ReactElement
}

export const PillToggle = <T,>(props: PillToggleProps<T>): React.ReactElement => {
  const {
    selectedView,
    onChange,
    disableToggle = false,
    className = '',
    options,
    disableToggleReasonIcon = 'error-outline',
    showDisableToggleReason = false,
    disableToggleReasonContent
  } = props

  const renderInvalidIcon = () => {
    return (
      <Icon
        name={disableToggleReasonIcon}
        size={12}
        className={css.disableToggleReasonIcon}
        data-testid="invalid-icon"
        intent={Intent.DANGER}
      />
    )
  }

  const renderInvalidBadge = (pillToggleValue: T) => {
    if (disableToggle && showDisableToggleReason && selectedView !== pillToggleValue) {
      if (!isEmpty(disableToggleReasonContent)) {
        return (
          <Popover interactionKind={PopoverInteractionKind.HOVER} position={Position.BOTTOM} className={Classes.DARK}>
            {renderInvalidIcon()}
            {disableToggleReasonContent}
          </Popover>
        )
      }
      return renderInvalidIcon()
    }
    return <></>
  }

  const applyDisableModeClass = disableToggle && (isEmpty(disableToggleReasonContent) || !showDisableToggleReason)

  return (
    <div className={cx(css.optionBtns, className)}>
      <div
        data-name="toggle-option-one"
        className={cx(css.item, {
          [css.selected]: selectedView === options[0].value,
          [css.disabledMode]: applyDisableModeClass
        })}
        onClick={() => {
          if (selectedView === options[0].value) {
            return
          }
          onChange(options[0].value)
        }}
        tabIndex={0}
        role="button">
        {options[0].label}
        {renderInvalidBadge(options[0].value)}
      </div>
      <div
        data-name="toggle-option-two"
        className={cx(css.item, {
          [css.selected]: selectedView === options[1].value,
          [css.disabledMode]: applyDisableModeClass
        })}
        onClick={() => {
          if (selectedView === options[1].value) {
            return
          }
          onChange(options[1].value)
        }}
        tabIndex={0}
        role="button">
        {options[1].label}
        {renderInvalidBadge(options[1].value)}
      </div>
    </div>
  )
}
