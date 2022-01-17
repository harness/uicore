/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useEffect } from 'react'
import { Button, ButtonProps } from '../Button/Button'
import { DateRangePicker, IDateRangePickerProps } from '@blueprintjs/datetime'
import { PopoverInteractionKind } from '@blueprintjs/core'

export interface DateRangePickerButtonProps extends Omit<ButtonProps, 'onChange'> {
  initialButtonText: string
  renderButtonText: (selectedDates: [Date, Date]) => string
  onChange: (selectedDates: [Date, Date]) => void
  isMaxDateEditable?: boolean
  initialMaxDate?: Date
  dateRangePickerProps?: IDateRangePickerProps
}

export const DateRangePickerButton: React.FC<DateRangePickerButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState(props.initialButtonText)
  const [selectedShortcutIndex, setSelectedShortcutIndex] = useState(-1)

  const [selected, setSelected] = useState(false)
  const [maxDate, setMaxDate] = useState(new Date())
  const [propMaxDate, setPropMaxDate] = useState(new Date())

  useEffect(() => {
    const propMaxDate = props.dateRangePickerProps && props.dateRangePickerProps.maxDate
    setPropMaxDate(propMaxDate || new Date())
    props.dateRangePickerProps && delete props.dateRangePickerProps.maxDate
    props.isMaxDateEditable
      ? setMaxDate(props.initialMaxDate || propMaxDate || new Date())
      : setMaxDate(propMaxDate || new Date())
  }, [])

  useEffect(() => {
    setText(props.initialButtonText)
  }, [props.initialButtonText])

  useEffect(() => {
    props.isMaxDateEditable && selected && setMaxDate(propMaxDate)
  }, [isOpen, selected])

  return (
    <Button
      minimal
      rightIcon="calendar"
      text={text}
      onClick={() => setIsOpen(open => !open)}
      tooltip={
        <DateRangePicker
          allowSingleDayRange={true}
          maxDate={maxDate}
          {...props.dateRangePickerProps}
          selectedShortcutIndex={selectedShortcutIndex}
          onShortcutChange={(_, index) => {
            setSelectedShortcutIndex(index)
          }}
          onChange={selectedDates => {
            setSelectedShortcutIndex(-1)

            if (selectedDates[0] && !selectedDates[1]) {
              setSelected(true)
            }
            if (selectedDates[0] && selectedDates[1]) {
              setIsOpen(false)
              props.onChange?.([selectedDates[0], selectedDates[1]])
              setText(props.renderButtonText([selectedDates[0], selectedDates[1]]))
            }
          }}
        />
      }
      tooltipProps={{
        interactionKind: PopoverInteractionKind.CLICK,
        onInteraction: isOpen => {
          setIsOpen(isOpen)
        },
        isOpen: isOpen
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
