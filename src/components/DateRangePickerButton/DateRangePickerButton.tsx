import React, { useState } from 'react'
import { Button, ButtonProps } from '../Button/Button'
import { DateRangePicker, IDateRangePickerProps } from '@blueprintjs/datetime'
import { Classes, PopoverInteractionKind } from '@blueprintjs/core'

export interface DateRangePickerButtonProps extends Omit<ButtonProps, 'onChange'> {
  initialButtonText: string
  renderButtonText: (selectedDates: [Date, Date]) => string
  onChange: (selectedDates: [Date, Date]) => void
  dateRangePickerProps?: IDateRangePickerProps
}

export const DateRangePickerButton: React.FC<DateRangePickerButtonProps> = props => {
  const [range, setRange] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState(props.initialButtonText)

  return (
    <Button
      minimal
      rightIcon="calendar"
      text={text}
      onClick={() => setIsOpen(open => !open)}
      tooltip={
        <DateRangePicker
          className={range?.length === 2 ? Classes.POPOVER_DISMISS : ''}
          allowSingleDayRange={true}
          maxDate={new Date()}
          {...props.dateRangePickerProps}
          onChange={selectedDates => {
            if (selectedDates[0] && selectedDates[1]) {
              setRange(selectedDates)
              setIsOpen(false)
              props.onChange?.([selectedDates[0], selectedDates[1]])
              setText(props.renderButtonText([selectedDates[0], selectedDates[1]]))
            }
          }}
        />
      }
      tooltipProps={{
        interactionKind: PopoverInteractionKind.CLICK,
        isOpen: isOpen,
        onClose: () => {
          setRange([])
        }
      }}
      {...{
        ...props,
        initialButtonText: undefined,
        renderButtonText: undefined,
        dateRangePickerProps: undefined,
        onChange: undefined
      }}
    />
  )
}
