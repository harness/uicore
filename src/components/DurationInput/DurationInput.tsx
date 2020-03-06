import React from 'react'

import { TextInput, TextInputProps } from '../TextInput/TextInput'
import { Icon } from '../../icons/Icon'
import { Popover } from '../Popover/Popover'
import { Text } from '../Text/Text'

import css from './DurationInput.css'

export type Units = 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
const TEXT_EXTRACT_REGEX = /(\d+)\s*([a-z]{1,2})/gi
const TEXT_LIMIT_REGEX = /[^0-9wdhms\s]/g
const UNIT_LESS_REGEX = /\d+(?!(ms|s|m|h|d|w|\d))/gi

export const UNIT_MULTIPLIIERS: Record<Units, number> = {
  ms: 1,
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24,
  w: 1e3 * 60 * 60 * 24 * 7
}

const UNITS_ORDER: Units[] = ['w', 'd', 'h', 'm', 's', 'ms']

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
  const done: Record<Units, boolean> = {
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
    const unit = units.toLowerCase() as Units

    // check in unit is valid and not already captured
    if (unit in UNIT_MULTIPLIIERS && !done[unit]) {
      // add to the time
      time += parseInt(n, 10) * UNIT_MULTIPLIIERS[unit]
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
    const n = Math.floor(t / UNIT_MULTIPLIIERS[key])
    t = t % UNIT_MULTIPLIIERS[key]

    if (n > 0) {
      str.push(`${n}${key}`)
    }
  })
  return str.join(' ')
}

export const HelpPopoverContent = (
  <Text padding="xlarge" style={{ minWidth: '192px' }}>
    You can use:
    <br />
    <br />
    <code>
      <b>w</b>
    </code>
    &nbsp;&nbsp;for weeks
    <br />
    <code>
      <b>d</b>
    </code>
    &nbsp;&nbsp;for days
    <br />
    <code>
      <b>h</b>
    </code>
    &nbsp;&nbsp;for hours
    <br />
    <code>
      <b>m</b>
    </code>
    &nbsp;&nbsp;for minutes
    <br />
    <code>
      <b>s</b>
    </code>
    &nbsp;&nbsp;for seconds
    <br />
    <code>
      <b>ms</b>
    </code>
    &nbsp;for milliseconds
  </Text>
)

export interface DurationInputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  value?: number
  onChange?(time: number): void
}

export function DurationInput(props: DurationInputProps) {
  const { value, onChange, ...rest } = props

  const [text, setText] = React.useState(timeToDisplayText(value || 0).trim())
  const [showWarning, setShowWarning] = React.useState(false)

  React.useEffect(() => {
    setText(timeToDisplayText(value || 0).trim())
  }, [value])

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(TEXT_LIMIT_REGEX, '')
    const hasWarning = UNIT_LESS_REGEX.test(val)

    setText(val)
    setShowWarning(hasWarning)

    // call onChange only when numbers are followed by allowed units
    if (typeof onChange === 'function' && !hasWarning) {
      const time = parseStringToTime(val)
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
        content={HelpPopoverContent}
        lazy={true}
        interactionKind="hover"
        position="top"
        usePortal={false}>
        <Icon name="question" size={14} />
      </Popover>
    </div>
  )
}
