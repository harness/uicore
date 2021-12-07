import React from 'react'
import cx from 'classnames'
import css from './PillToggle.css'

export interface PillToggleOption<T> {
  label: string
  value: T
}

export interface PillToggleProps<T> {
  selectedView?: T
  options: [PillToggleOption<T>, PillToggleOption<T>]
  onChange: (val: T) => void
  disableToggle?: boolean
  className?: string
}

export const PillToggle = <T,>(props: PillToggleProps<T>): React.ReactElement => {
  const { selectedView, onChange, disableToggle = false, className = '', options } = props
  const view = selectedView ?? options[0].value
  return (
    <div className={cx(css.optionBtns, className)}>
      <div
        data-name="toggle-option-one"
        className={cx(css.item, {
          [css.selected]: view === options[0].value,
          [css.disabledMode]: disableToggle
        })}
        onClick={() => {
          if (view === options[0].value) {
            return
          }
          onChange(options[0].value)
        }}
        tabIndex={0}
        role="button">
        {options[0].label}
      </div>
      <div
        data-name="toggle-option-two"
        className={cx(css.item, {
          [css.selected]: view === options[1].value,
          [css.disabledMode]: disableToggle
        })}
        onClick={() => {
          if (view === options[1].value) {
            return
          }
          onChange(options[1].value)
        }}
        tabIndex={0}
        role="button">
        {options[1].label}
      </div>
    </div>
  )
}
