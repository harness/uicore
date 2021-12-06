import React, { SetStateAction, Dispatch } from 'react'
import cx from 'classnames'
import css from './PillToggle.css'

export interface PillToggleOption<T> {
  label: string
  value: T
}

export interface PillToggleProps<T> {
  initialSelectedView?: T
  options: [PillToggleOption<T>, PillToggleOption<T>]
  beforeOnChange: (val: T, callbackFn: Dispatch<SetStateAction<T>>) => void
  disableSwitch?: boolean
  className?: string
}

export const PillToggle = <T,>(props: PillToggleProps<T>): React.ReactElement => {
  const { initialSelectedView, beforeOnChange, disableSwitch = false, className = '', options } = props
  const [selectedView, setSelectedView] = React.useState<T>(initialSelectedView || options[0].value)

  React.useEffect(() => {
    if (selectedView !== initialSelectedView) {
      setSelectedView(initialSelectedView || options[0].value)
    }
  }, [initialSelectedView])

  return (
    <div className={cx(css.optionBtns, className)}>
      <div
        data-name="toggle-option-one"
        className={cx(css.item, {
          [css.selected]: selectedView === options[0].value,
          [css.disabledMode]: disableSwitch
        })}
        onClick={() => {
          if (selectedView === options[0].value) {
            return
          }
          beforeOnChange(options[0].value, setSelectedView)
        }}
        tabIndex={0}
        role="button">
        {options[0].label}
      </div>
      <div
        data-name="toggle-option-two"
        className={cx(css.item, {
          [css.selected]: selectedView === options[1].value,
          [css.disabledMode]: disableSwitch
        })}
        onClick={() => {
          beforeOnChange(options[1].value, setSelectedView)
        }}
        tabIndex={0}
        role="button">
        {options[1].label}
      </div>
    </div>
  )
}
