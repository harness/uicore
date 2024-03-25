/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FormEvent, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react'
import { omitStyledProps, styledClasses, StyledProps } from '@harnessio/design-system'
import { RadioButton, RadioButtonProps } from './RadioButton'

import css from './RadioButtonGroup.css'

export interface RadioButtonGroupProps extends StyledProps {
  className?: string
  disabled?: boolean
  inline?: boolean
  label?: ReactNode
  name?: string
  asPills?: boolean
  onChange: (e: FormEvent<HTMLInputElement>) => void
  options: Array<Pick<RadioButtonProps, 'label' | 'value' | 'disabled' | 'tooltipId'>>
  selectedValue?: string | number
}

export function RadioButtonGroup({
  className = '',
  disabled = false,
  inline = false,
  label = '',
  name = '',
  asPills = false,
  onChange,
  options,
  selectedValue = '',
  ...props
}: RadioButtonGroupProps): ReactElement {
  const [value, setValue] = useState<string | number>(selectedValue)
  const groupName = useMemo<string>(() => name || `RadioButtonGroup${Math.floor(Math.random() * 10000)}`, [name])

  useEffect(() => {
    setValue(selectedValue)
  }, [selectedValue])

  const optionOnChangeHandler: RadioButtonProps['onChange'] = e => {
    setValue(e.target.value)
    onChange(e)
  }

  return (
    <div className={styledClasses(props, className)} {...omitStyledProps(props)}>
      {label && <label className={css.radioButtonGroupLabel}>{label}</label>}

      <div className={inline ? css.inline : ''}>
        {options.map(optionProps => (
          <RadioButton
            key={optionProps.value}
            name={groupName}
            checked={optionProps.value === value}
            onChange={optionOnChangeHandler}
            {...optionProps}
            disabled={disabled || optionProps.disabled}
            asPill={asPills}
          />
        ))}
      </div>
    </div>
  )
}
