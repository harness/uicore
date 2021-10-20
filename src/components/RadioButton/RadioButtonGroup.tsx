import React, { FormEvent, ReactElement, ReactNode, useMemo, useState } from 'react'
import { omitStyledProps, styledClasses, StyledProps } from '../../styled-props/StyledProps'
import { RadioButton, RadioButtonProps } from './RadioButton'

import css from './RadioButtonGroup.css'

export interface RadioButtonGroupProps extends StyledProps {
  className?: string
  disabled?: boolean
  inline?: boolean
  label?: ReactNode
  name?: string
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
  onChange,
  options,
  selectedValue = '',
  ...props
}: RadioButtonGroupProps): ReactElement {
  const [value, setValue] = useState<string | number>(selectedValue)
  const groupName = useMemo<string>(() => name || `RadioButtonGroup${Math.floor(Math.random() * 10000)}`, [name])

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
          />
        ))}
      </div>
    </div>
  )
}
