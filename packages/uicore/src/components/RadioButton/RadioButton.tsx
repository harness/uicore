/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ChangeEvent, ReactElement, ReactNode } from 'react'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import { StyledProps, styledClasses, omitStyledProps } from '@harnessio/design-system'

import css from './RadioButton.css'

export interface RadioButtonProps extends StyledProps {
  label?: ReactNode
  value?: string | number
  name?: string
  className?: string
  checked?: boolean
  disabled?: boolean
  tooltipId?: string
  asPill?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function RadioButton({
  label = '',
  value,
  name = '',
  className = '',
  checked = false,
  disabled = false,
  tooltipId,
  asPill = false,
  onChange = () => undefined,
  ...props
}: RadioButtonProps & StyledProps): ReactElement {
  return (
    <label
      className={styledClasses(
        props,
        css.radioLabel,
        asPill ? css.asPill : css.radio,
        asPill && checked ? css.pillChecked : '',
        className
      )}
      {...omitStyledProps(props)}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
        disabled={disabled}
        className={css.input}
        onChange={onChange}
      />
      <span className={css.radioIcon} />
      {tooltipId ? (
        <span className={css.tooltipAlign} data-tooltip-id={tooltipId}>
          {label}
          <HarnessDocTooltip tooltipId={tooltipId} useStandAlone />
        </span>
      ) : (
        label
      )}
    </label>
  )
}
