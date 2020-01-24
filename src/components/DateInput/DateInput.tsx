import React, { useState, useEffect } from 'react'
import css from './DateInput.css'
import { TextInput, TextInputProps } from '../TextInput/TextInput'
import { DatePicker, TimePrecision, IDatePickerProps } from '@blueprintjs/datetime'
import { Intent } from '@blueprintjs/core'
import { Button } from '../Button/Button'
import { Popover } from '../Popover/Popover'
import { HelpPopoverContent, parseStringToTime, timeToDisplayText } from '../DurationInput/DurationInput'
import moment from 'moment'
import { Icon } from '../../icons/Icon'

interface DateInputProps extends Omit<TextInputProps, 'onChange'> {
  dateTimeFormat?: string
  dateProps?: IDatePickerProps
  timePrecision?: TimePrecision
  onChange?: (value: string | undefined, error?: string) => void
  allowVariables?: boolean
}

interface DateInputState {
  isDate: boolean
  value?: string
  intent?: Intent
}

const REGEX_VALID_TEXT = /^(current\(\)|\${[a-z._]+})(\s*[+-]\s*)*([0-9]+[wdhms]+\s*)*$/gi
const REGEX_VALID_MS_TEXT = /^(current\(\)|\${[a-z._]+})(\s*[+-]\s*)*([0-9]+)*$/gi
const REGEX_VALID_VARIABLE = /^(current\(\)|\${[a-z._]+})(\s*[+-]\s*)*/gi
const REGEX_VALID_VALUE = /([0-9]+[wdhms]+\s*)*$/gi
const REGEX_VALID_MS_VALUE = /([0-9])*$/gi

const isValidDateInput = (value: number | string | undefined, minDate: Date, maxDate: Date, formatDateTime: string) => {
  if (value === '') {
    return true
  }
  const date = moment(value, formatDateTime)
  return date.isValid() && date.isBetween(minDate, maxDate)
}

export const DateInput: React.FC<DateInputProps> = props => {
  const { timePrecision, allowVariables, dateProps, ...otherProps } = props
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
          isDate: true
        }))
      } else if (allowVariables) {
        // If allowVariables set to True
        const isValid = REGEX_VALID_MS_TEXT.test(value)
        REGEX_VALID_MS_TEXT.lastIndex = 0
        if (isValid) {
          // Valid value
          const timeValueString = value.replace(REGEX_VALID_VARIABLE, '').trim()
          REGEX_VALID_VARIABLE.lastIndex = 0
          const timeDisplay =
            timeValueString && timeValueString !== '' && !isNaN(timeValueString as any)
              ? timeToDisplayText(parseInt(timeValueString))
              : ''
          displayValue = value.replace(REGEX_VALID_MS_VALUE, '') + timeDisplay
          REGEX_VALID_MS_VALUE.lastIndex = 0
          setState(prevState => ({
            ...prevState,
            value: displayValue,
            isDate: false,
            intent: Intent.SUCCESS
          }))
        } else {
          // Invalid Value
          setState(prevState => ({
            ...prevState,
            value,
            isDate: false,
            intent: Intent.DANGER
          }))
        }
      } else {
        // Fallback to see if moment can convert this to date/datetime
        const isValidDate = isValidDateInput(value, minDate, maxDate, formatDateTime)
        setState(prevState => ({
          ...prevState,
          value,
          isDate: isValidDate,
          intent: isValidDate ? undefined : Intent.DANGER
        }))
      }
  }, [props.value])

  // OnChange of Input Box
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isValidDate = isValidDateInput(value, minDate, maxDate, formatDateTime)
    const isValidText = REGEX_VALID_TEXT.test(value)
    REGEX_VALID_TEXT.lastIndex = 0

    // Check if OnChange is passes as props
    if (onChange && (isValidDate || isValidText)) {
      // Valid Input
      if (isValidText) {
        // Extract time from string
        const time = parseStringToTime(value.replace(REGEX_VALID_VARIABLE, '').trim())
        const timeString = time !== 0 ? time.toString() : ''
        onChange(value.replace(REGEX_VALID_VALUE, '') + timeString)
        REGEX_VALID_VARIABLE.lastIndex = 0
        REGEX_VALID_VALUE.lastIndex = 0
      } else {
        onChange(
          moment(value, formatDateTime)
            .valueOf()
            .toString()
        )
      }
    } else if (onChange) {
      // Not a Valid Date
      onChange(undefined, 'Not a valid date')
    }

    // Update State
    if (isValidDate) {
      setState(prevState => ({ ...prevState, value, isDate: isValidDate, intent: undefined }))
    } else if (isValidText) {
      setState(prevState => ({ ...prevState, value, isDate: false, intent: Intent.SUCCESS }))
    } else {
      setState(prevState => ({ ...prevState, value, isDate: isValidDate, intent: Intent.DANGER }))
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
        errorText={state.intent === Intent.DANGER ? 'Not a valid date' : undefined}
        onChange={onChangeText}
      />
      {state.isDate ? (
        <Popover
          boundary="viewport"
          usePortal={false}
          position="top-left"
          className={css.calendarIcon}
          content={<DatePicker {...dateInputProps} />}>
          <Button minimal icon="calendar" />
        </Popover>
      ) : null}
      {allowVariables ? (
        <div className={css.helpText}>
          Support custom variables: &#x22;current() + 2d&#x22;
          <Popover
            wrapperTagName="span"
            className={css.helpIcon}
            content={HelpPopoverContent}
            lazy={true}
            interactionKind="hover"
            position="top"
            usePortal={false}>
            <Icon name="question" size={14} />
          </Popover>{' '}
        </div>
      ) : null}
    </div>
  )
}
