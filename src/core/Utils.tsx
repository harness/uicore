import { Classes } from '@blueprintjs/core'
import copy from 'clipboard-copy'
import cx from 'classnames'
import React, { KeyboardEvent, MouseEvent } from 'react'
import { Popover } from '../components/Popover/Popover'
import { Text } from '../components/Text/Text'
import { Color } from './Color'
import { Intent } from './Intent'
import { OptionalTooltip } from './Types'
import {FormikContext} from "formik";
import {get, isPlainObject} from "lodash-es";

function stopEvent(event: MouseEvent | KeyboardEvent): void {
  event.stopPropagation()
  event.preventDefault()
}

const randomId = (): string => Math.random().toString(36).substring(2)

function getIntentColors(intent: Intent): { color: string; backgroundColor: string } {
  let color: Color = Color.WHITE
  let backgroundColor

  switch (intent) {
    case Intent.PRIMARY:
      backgroundColor = Color.PRIMARY_7
      break
    case Intent.SUCCESS:
      backgroundColor = Color.GREEN_500
      break
    case Intent.WARNING:
      backgroundColor = Color.YELLOW_500
      break
    case Intent.DANGER:
      backgroundColor = Color.RED_500
      break
    default:
      color = Color.GREY_500
      backgroundColor = Color.WHITE
      break
  }

  return { color, backgroundColor }
}

// Convert UICore named color into real CSS color
const getRealCSSColor = (color: Color): string =>
  `var(--${color // eslint-disable-line
    .match(/[A-Z][a-z]+|[0-9]+|[a-z]+/g)!
    .join('-')
    .toLowerCase()})`

interface WrapOptionalTooltipProps extends OptionalTooltip {
  children: JSX.Element
}

export function WrapOptionalTooltip({ tooltip, tooltipProps, children }: WrapOptionalTooltipProps): React.ReactElement {
  const isDark = tooltipProps?.isDark
  const content =
    typeof tooltip === 'string' ? (
      <Text
        padding="medium"
        style={{
          maxWidth: '500px',
          maxHeight: '500px',
          overflow: 'auto',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          hyphens: 'auto'
        }}
        color={(isDark && 'white') || undefined}>
        {tooltip}
      </Text>
    ) : (
      tooltip
    )

  return tooltip ? (
    <Popover
      boundary="viewport"
      position="top"
      interactionKind="hover"
      {...tooltipProps}
      popoverClassName={cx(isDark ? Classes.DARK : undefined, tooltipProps?.popoverClassName)}
      content={content || ''}>
      {children}
    </Popover>
  ) : (
    children
  )
}

export const errorCheck = (name: string, formik?: FormikContext<any>): boolean | '' | 0 | undefined =>
    ((get(formik?.touched, name) || (formik?.submitCount && formik?.submitCount > 0)) &&
        get(formik?.errors, name) &&
        !isPlainObject(get(formik?.errors, name))) as boolean

export function romanize(num: number, isLowerCase = false): string | number {
  if (isNaN(num)) return NaN
  const digits = String(+num).split('')
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX'
  ]

  let roman = ''
  let i = 3
  while (i--) roman = (key[parseInt(digits.pop() || '') + i * 10] || '') + roman
  const returnStr = Array(+digits.join('') + 1).join('M') + roman
  return isLowerCase ? returnStr.toLowerCase() : returnStr
}

const Utils = { stopEvent, copy, randomId, getIntentColors, getRealCSSColor, WrapOptionalTooltip, romanize }

export { Utils }
