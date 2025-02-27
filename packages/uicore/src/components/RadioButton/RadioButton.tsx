/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ChangeEvent, ReactElement, ReactNode } from 'react'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import { StyledProps, styledClasses, omitStyledProps } from '@harness/design-system'

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
  defaultChecked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function RadioButton({
  label = '',
  value,
  name = '',
  className = '',
  defaultChecked = false,
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
        asPill ? css.asPill : css.radio,
        asPill && checked ? css.pillChecked : '',
        className
      )}
      {...omitStyledProps(props)}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        checked={checked}
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
