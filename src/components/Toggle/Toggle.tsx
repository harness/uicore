import React, { ChangeEvent, ReactElement } from 'react'
import { StyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Toggle.css'

export interface ToggleProps {
  label?: string
  value?: string | number
  className?: string
  checked?: boolean
  disabled?: boolean
  onToggle?: (checked: boolean) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Toggle({
  label = '',
  value,
  className = '',
  checked = false,
  disabled = false,
  onToggle = () => undefined,
  onChange = () => undefined,
  ...props
}: ToggleProps & StyledProps): ReactElement {
  return (
    <label className={styledClasses(styledClass.font, css.toggle, className)} {...props}>
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
    </label>
  )
}
