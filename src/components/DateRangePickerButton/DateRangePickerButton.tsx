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
  const [text, setText] = useState(props.initialButtonText)

  return (
    <Button
      minimal
      rightIcon="calendar"
      text={text}
      tooltip={
        <DateRangePicker
          className={range?.length === 2 && !range[1] ? Classes.POPOVER_DISMISS : undefined}
          allowSingleDayRange={true}
          maxDate={new Date()}
          onChange={selectedDates => {
            setRange(selectedDates)

            if (selectedDates?.length === 2 && selectedDates[0] && selectedDates[1]) {
              props.onChange?.([selectedDates[0], selectedDates[1]])
              setText(props.renderButtonText([selectedDates[0], selectedDates[1]]))
            }
          }}
          {...props.dateRangePickerProps}
        />
      }
      tooltipProps={{
        interactionKind: PopoverInteractionKind.CLICK,
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
