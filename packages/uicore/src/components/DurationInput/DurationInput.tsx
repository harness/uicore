/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'

import { TextInput, TextInputProps } from '../TextInput/TextInput'
import { Icon } from '@harness/icons'
import { Popover } from '../Popover/Popover'
import { Text } from '../Text/Text'

import css from './DurationInput.css'

export type DurationUnits = 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
const TEXT_EXTRACT_REGEX = /(\d+)\s*([a-z]{1,2})/gi
const TEXT_LIMIT_REGEX = /[^0-9wdhms\s]/g
const UNIT_LESS_REGEX = /\d+(?:\.\d+)?(?:e\+\d+)?(?!(ms|s|m|h|d|w|\d))/i
const VALID_SYNTAX_REGEX = /^(\d+(?:\.\d+)?(?:e\+\d+)?w\s*)?(\d+(?:\.\d+)?(?:e\+\d+)?d\s*)?(\d+(?:\.\d+)?(?:e\+\d+)?h\s*)?(\d+(?:\.\d+)?(?:e\+\d+)?m\s*)?(\d+(?:\.\d+)?(?:e\+\d+)?s\s*)?(\d+(?:\.\d+)?(?:e\+\d+)?ms\s*)?$/i

export const UNIT_MULTIPLIERS: Record<DurationUnits, number> = {
  ms: 1,
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24,
  w: 1e3 * 60 * 60 * 24 * 7
}

const UNITS_ORDER: DurationUnits[] = ['w', 'd', 'h', 'm', 's', 'ms']

const UNITS_MAP = new Map([
  ['w', 'weeks'],
  ['d', 'days'],
  ['h', 'hours'],
  ['m', 'minutes'],
  ['s', 'seconds'],
  ['ms', 'milliseconds']
])
/**
 * Converts time string like '1d 2h' to time (in ms)
 */
export function parseStringToTime(str: string): number {
  let time = 0
  /*
      A varibale for tracking if a unit is processed already.
      This will help in avoiding duplicate units.

      For example if a user enters '1w 2d 2w',
      only '1w' will be considred and '2w' will be ignored
    */
  const done: Record<DurationUnits, boolean> = {
    w: false,
    d: false,
    h: false,
    m: false,
    s: false,
    ms: false
  }

  /**
   * String.replace calls the callback with all the matching groups
   * as arguments from position 2
   *
   * @param {String} _     The entire string
   * @param {String} n     First capture group, the number in this case
   * @param {String} units Second capture group, the unit in this case
   */
  str.replace(TEXT_EXTRACT_REGEX, (_: string, n: string, units: string) => {
    const unit = units.toLowerCase() as DurationUnits

    // check in unit is valid and not already captured
    if (unit in UNIT_MULTIPLIERS && !done[unit]) {
      // add to the time
      time += parseInt(n, 10) * UNIT_MULTIPLIERS[unit]
      // set the unit as already captured
      done[unit] = true
    }

    return ''
  })

  return time
}

/**
 * Converts given time (in ms) to text like '2h 30m'
 */
export function timeToDisplayText(time: number): string {
  if (time < 1) return ''

  const str: string[] = []
  let t = time

  UNITS_ORDER.forEach(key => {
    const n = Math.floor(t / UNIT_MULTIPLIERS[key])
    t = t % UNIT_MULTIPLIERS[key]

    if (n > 0) {
      str.push(`${n}${key}`)
    }
  })
  return str.join(' ')
}

/**
 * Converts given time without spaces '1w2d3m' to text like '1w 2d 3m'
 */
export function spaceOutFormatTime(characters: string[], allowedValues: DurationUnits[]): string {
  return characters
    .map((char, index) => {
      const isPreviousCharUnit =
        index > 1 &&
        characters[index - 1]?.trim() &&
        allowedValues.includes((characters[index - 1] as unknown) as DurationUnits)
      return isPreviousCharUnit && char?.trim() && !isNaN(parseInt(char)) ? ` ${char}` : char
    })
    .join('')
}

export const getHelpPopoverContent = (allowedUnits: DurationUnits[]): React.ReactElement => (
  <Text padding="xlarge" style={{ minWidth: '192px' }}>
    You can use:
    <br />
    {allowedUnits.map((unit: string) => {
      return (
        <>
          <br />
          <code>
            <b>{unit}</b>
          </code>
          <span>&nbsp;&nbsp;for {UNITS_MAP.get(unit)}</span>
        </>
      )
    })}
  </Text>
)

export interface DurationInputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  value?: number
  // will be string if valueInTimeFormat is passed
  valueInTimeFormat?: string
  onChange?(time: number | string, hasWarning?: boolean): void
  allowedUnits?: DurationUnits[]
  allowVariables?: boolean
}
export function DurationInput(props: DurationInputProps): React.ReactElement {
  const { value, valueInTimeFormat, allowVariables, allowedUnits, onChange, ...rest } = props
  let fieldValueCorrected: string

  const [text, setText] = React.useState(
    // do not trim any valueInTimeFormat
    !valueInTimeFormat && valueInTimeFormat?.trim() !== '' ? timeToDisplayText(value || 0).trim() : valueInTimeFormat
  )
  const [showWarning, setShowWarning] = React.useState(false)

  React.useEffect(() => {
    setText(
      !valueInTimeFormat && valueInTimeFormat?.trim() !== '' ? timeToDisplayText(value || 0).trim() : valueInTimeFormat
    )
  }, [value])

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isFieldValueAVariable = allowVariables && e.target.value?.startsWith('$')
    const fieldValue = isFieldValueAVariable ? e.target.value : e.target.value.replace(TEXT_LIMIT_REGEX, '')
    let hasWarning = UNIT_LESS_REGEX.test(fieldValue) || !VALID_SYNTAX_REGEX.test(fieldValue)

    if (isFieldValueAVariable && e.target.value.endsWith('}')) {
      hasWarning = false
    }

    if (allowedUnits) {
      // if limited allowed units, show warning when non-expression value breaks the rule
      const diff = UNITS_ORDER.filter(unit => !allowedUnits.includes(unit))
      if (!e.target.value.startsWith('$') && diff.some(unit => e.target.value.includes(unit))) {
        hasWarning = true
      }
    }

    if (typeof valueInTimeFormat === 'string') {
      const characters = fieldValue.split('')
      const requiresSpacing =
        VALID_SYNTAX_REGEX.test(fieldValue) &&
        characters.some(
          (char, index) =>
            UNITS_ORDER.includes((char as unknown) as DurationUnits) &&
            index + 1 !== characters.length &&
            characters[index + 1] !== ' '
        )
      if (requiresSpacing) {
        fieldValueCorrected = spaceOutFormatTime(characters, UNITS_ORDER)
        setText(fieldValueCorrected)
      } else {
        setText(fieldValue)
      }
    } else {
      setText(fieldValue)
    }
    setShowWarning(hasWarning)

    // call onChange only when numbers are followed by allowed units
    // or when value is an expression
    if (typeof onChange === 'function' && (!hasWarning || isFieldValueAVariable)) {
      const time =
        !valueInTimeFormat && valueInTimeFormat?.trim() !== ''
          ? parseStringToTime(fieldValue)
          : fieldValueCorrected || fieldValue
      onChange(time)
    }
  }

  return (
    <div className={css.main}>
      <TextInput
        placeholder="Enter w/d/h/m/s/ms"
        {...rest}
        value={text}
        onChange={handleTextChange}
        rightElement={showWarning ? 'warning-sign' : undefined}
        rightElementProps={{ className: css.warnIcon }}
      />
      <Popover
        wrapperTagName="div"
        className={css.helpIcon}
        content={getHelpPopoverContent(allowedUnits || UNITS_ORDER)}
        lazy={true}
        interactionKind="hover"
        position="top"
        usePortal={false}>
        <Icon name="question" size={14} />
      </Popover>
    </div>
  )
}

export const DurationInputHelpers = {
  TEXT_EXTRACT_REGEX,
  TEXT_LIMIT_REGEX,
  UNIT_LESS_REGEX,
  VALID_SYNTAX_REGEX,
  UNIT_MULTIPLIERS,
  UNITS_ORDER
}
