/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useEffect } from 'react'
import css from './DateInput.css'
import { TextInput, TextInputProps } from '../TextInput/TextInput'
import { DatePicker, TimePrecision, IDatePickerProps } from '@blueprintjs/datetime'
import { Intent } from '@blueprintjs/core'
import { Button } from '../Button/Button'
import { Popover, PopoverProps } from '../Popover/Popover'
import {
  getHelpPopoverContent,
  DurationInputHelpers,
  parseStringToTime,
  timeToDisplayText
} from '../DurationInput/DurationInput'
import moment from 'moment'
import { Icon } from '@harness/icons'

export interface DateInputProps extends Omit<TextInputProps, 'onChange'> {
  dateTimeFormat?: string
  dateProps?: IDatePickerProps
  timePrecision?: TimePrecision
  onChange?: (value: string | undefined, error?: string) => void
  allowVariables?: boolean
  popoverProps?: PopoverProps
}
enum Errors {
  NOT_VALID_DATE = 'Not a valid date',
  NOT_VALID_EXPRESSION = 'Not a valid Date Expression'
}
interface DateInputState {
  isDate: boolean
  value?: string
  intent?: Intent
  error?: Errors | undefined
}

const { UNITS_ORDER: ALL_UNITS } = DurationInputHelpers

const REGEX_VALID_TEXT = /^(current\(\)|\${[a-z\d._]+})(\s*[+-]\s*)*([0-9]+[wdhms]+\s*)*$/i
const REGEX_VALID_MS_TEXT = /^(current\(\)|\${[a-z\d._]+})(\s*[+-]\s*)*([0-9]+)*$/i
const REGEX_VALID_VARIABLE = /^(current\(\)|\${[a-z\d._]+})(\s*[+-]\s*)*/i
const REGEX_VALID_VALUE = /([0-9]+[wdhms]+\s*)*$/i
const REGEX_VALID_MS_VALUE = /([0-9])*$/i
const REGEX_VALID_DATE = /^\d{2,4}.\d{2,4}.\d{2,4}$/i
const REGEX_VALID_DATE_TIME = /^\d{2,4}.\d{2,4}.\d{2,4}\s\d{1,2}:\d{2}$/i

const isValidDateInput = (
  value: number | string | undefined,
  minDate: Date,
  maxDate: Date,
  formatDateTime: string,
  isTime: boolean
) => {
  if (value === '') {
    return true
  }
  const isRegExValid =
    typeof value === 'number' ||
    (typeof value === 'string' && (isTime ? REGEX_VALID_DATE_TIME.test(value) : REGEX_VALID_DATE.test(value)))
  const date = moment(value, formatDateTime)
  return isRegExValid && date.isValid() && date.isBetween(minDate, maxDate)
}

export const DateInput: React.FC<DateInputProps> = props => {
  const { timePrecision, allowVariables, dateProps, popoverProps, ...otherProps } = props
  const { dateTimeFormat, onChange } = props
  const formatDateTime = dateTimeFormat || (timePrecision ? 'MM/DD/YYYY HH:mm' : 'MM/DD/YYYY')

  const maxDate = dateProps && dateProps.maxDate ? dateProps.maxDate : new Date(2050, 5, 5)
  const minDate = dateProps && dateProps.minDate ? dateProps.minDate : new Date(1990, 5, 5)

  const [state, setState] = useState<DateInputState>({ isDate: true, value: '' })
  let dateDefaultValue = new Date()

  useEffect(() => {
    const { value, allowVariables } = props
    let displayValue = ''
    if (value && typeof value === 'string' && value !== '')
      if (!isNaN(value as any)) {
        // Check long number
        displayValue = moment(parseInt(value)).format(formatDateTime)
        dateDefaultValue = new Date(parseInt(value))
        setState(prevState => ({
          ...prevState,
          value: displayValue,
          error: undefined,
          isDate: true
        }))
      } else if (allowVariables) {
        // If allowVariables set to True
        const isValid = REGEX_VALID_MS_TEXT.test(value)
        if (isValid) {
          // Valid value
          const timeValueString = value.replace(REGEX_VALID_VARIABLE, '').trim()
          const timeDisplay =
            timeValueString && timeValueString !== '' && !isNaN(timeValueString as any)
              ? timeToDisplayText(parseInt(timeValueString))
              : ''
          displayValue = value.replace(REGEX_VALID_MS_VALUE, '') + timeDisplay
          setState(prevState => ({
            ...prevState,
            value: displayValue,
            isDate: false,
            error: undefined,
            intent: Intent.SUCCESS
          }))
        } else {
          // Invalid Value
          setState(prevState => ({
            ...prevState,
            value,
            error: Errors.NOT_VALID_EXPRESSION,
            isDate: false,
            intent: Intent.DANGER
          }))
        }
      } else {
        // Fallback to see if moment can convert this to date/datetime
        const isValidDate = isValidDateInput(value, minDate, maxDate, formatDateTime, !!timePrecision)
        setState(prevState => ({
          ...prevState,
          value,
          isDate: isValidDate,
          error: Errors.NOT_VALID_DATE,
          intent: isValidDate ? undefined : Intent.DANGER
        }))
      }
  }, [props.value])

  // OnChange of Input Box
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = event.target.value
    const value = event.target.value.trim()
    const isValidDate = isValidDateInput(value, minDate, maxDate, formatDateTime, !!timePrecision)
    const isValidText = REGEX_VALID_TEXT.test(value)
    const isCustomValue = REGEX_VALID_VARIABLE.test(value)

    // Check if OnChange is passes as props
    if (onChange) {
      // Valid Input
      if (isValidText && isCustomValue) {
        // Extract time from string
        const time = parseStringToTime(value.replace(REGEX_VALID_VARIABLE, '').trim())
        const timeString = time !== 0 ? time.toString() : ''
        onChange(value.replace(REGEX_VALID_VALUE, '') + timeString)
      } else if (isValidDate && !isCustomValue) {
        if (value !== '') {
          onChange(moment(value, formatDateTime).valueOf().toString())
        } else {
          onChange(value)
        }
      } else if (isCustomValue) {
        // Not a Valid Date expression
        onChange(undefined, Errors.NOT_VALID_EXPRESSION)
      } else {
        // Not a Valid Date
        onChange(undefined, Errors.NOT_VALID_DATE)
      }
    }

    // Update State
    if (isValidText) {
      setState(prevState => ({
        ...prevState,
        value: originalValue,
        isDate: false,
        intent: Intent.SUCCESS,
        error: undefined
      }))
    } else if (isValidDate && !isCustomValue) {
      setState(prevState => ({
        ...prevState,
        value: originalValue,
        isDate: isValidDate,
        intent: undefined,
        error: undefined
      }))
    } else {
      if (isCustomValue) {
        setState(prevState => ({
          ...prevState,
          value: originalValue,
          isDate: false,
          error: Errors.NOT_VALID_EXPRESSION,
          intent: Intent.DANGER
        }))
      } else {
        setState(prevState => ({
          ...prevState,
          value: originalValue,
          isDate: isValidDate,
          error: Errors.NOT_VALID_DATE,
          intent: Intent.DANGER
        }))
      }
    }
  }

  // On Change with CAlender
  const onChangeDate = (selectedDate: Date) => {
    if (onChange) {
      onChange(selectedDate.getTime().toString())
    }
    setState(prevState => ({ ...prevState, value: moment(selectedDate.getTime()).format(formatDateTime) }))
  }

  // Pase Date input pass to blueprint DatePicker
  const dateValue = state.value && state.isDate ? moment(state.value, formatDateTime).toDate() : undefined
  const dateInputProps = {
    defaultValue: dateDefaultValue,
    value: dateValue,
    closeOnSelection: false,
    popoverProps: {
      usePortal: false
    },
    formatDate: (date: Date) => moment(date.getTime()).format(formatDateTime),
    parseDate: (str: string) => new Date(str),
    maxDate,
    minDate,
    placeholder: formatDateTime,
    timePrecision,
    onChange: onChangeDate,
    ...dateProps
  }

  return (
    <div className={css.dateInput}>
      <TextInput
        {...otherProps}
        type="text"
        value={state.value}
        intent={state.intent}
        placeholder={formatDateTime}
        errorText={state.error}
        onChange={onChangeText}
      />
      {state.isDate ? (
        <Popover
          boundary="viewport"
          usePortal={false}
          position="top-left"
          className={css.calendarIcon}
          content={<DatePicker {...dateInputProps} />}
          {...popoverProps}>
          <Button minimal icon="calendar" />
        </Popover>
      ) : null}
      {allowVariables ? (
        <div className={css.helpText}>
          Support custom variables: &#x22;current() + 2d 2h&#x22;
          <Popover
            wrapperTagName="span"
            className={css.helpIcon}
            content={getHelpPopoverContent(ALL_UNITS)}
            lazy={true}
            interactionKind="hover"
            position="top"
            usePortal={false}
            {...popoverProps}>
            <Icon name="question" size={14} />
          </Popover>{' '}
        </div>
      ) : null}
    </div>
  )
}
