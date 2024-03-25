/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ChangeEvent, ReactElement } from 'react'
import { StyledProps, styledClasses } from '@harnessio/design-system'
import { styledClass } from '@harnessio/design-system'

import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'

import css from './Toggle.css'

export interface ToggleProps {
  label?: string
  value?: string | number
  className?: string
  checked?: boolean
  disabled?: boolean
  onToggle?: (checked: boolean) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  tooltipId?: string
}

export function Toggle({
  label = '',
  value,
  className = '',
  checked = false,
  disabled = false,
  onToggle = () => undefined,
  onChange = () => undefined,
  tooltipId,
  ...props
}: ToggleProps & StyledProps): ReactElement {
  return (
    <label className={styledClasses(styledClass.font, css.toggle, className)} data-tooltip-id={tooltipId} {...props}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        disabled={disabled}
        className={css.input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onToggle(e.currentTarget.checked)
          onChange(e)
        }}
      />
      <span className={css.toggleIcon} />
      {label}
      <HarnessDocTooltip tooltipId={tooltipId} useStandAlone={true} />
    </label>
  )
}
