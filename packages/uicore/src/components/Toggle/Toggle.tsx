/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ChangeEvent, ReactElement } from 'react'
import { StyledProps, styledClasses } from '@harness/design-system'
import { styledClass } from '@harness/design-system'

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
