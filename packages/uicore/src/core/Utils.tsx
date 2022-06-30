/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Classes } from '@blueprintjs/core'
import copy from 'clipboard-copy'
import cx from 'classnames'
import React, { KeyboardEvent, MouseEvent } from 'react'
import { Popover } from '../components/Popover/Popover'
import { Color, Intent, OptionalTooltip } from '@harness/design-system'
import { FormikContextType } from 'formik'
import { get, isPlainObject } from 'lodash-es'
import css from './Utils.css'

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
      <div className={css.tooltipContainer} color={(isDark && 'white') || undefined}>
        {tooltip}
      </div>
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

export const errorCheck = (name: string, formik?: FormikContextType<any>): boolean | '' | 0 | undefined =>
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

export const getSelectComponentPlaceholder = (plc?: string) => {
  // idea is to display placeholder like `- Select -`
  // This is as per the latest designs
  if (plc) {
    return `- ${plc} -`
  }
  return `- Select -`
}

// adopted from https://github.com/sindresorhus/escape-string-regexp v5.0.0
export function escapeStringRegexp(str: string): string {
  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}

const Utils = {
  stopEvent,
  copy,
  randomId,
  getIntentColors,
  getRealCSSColor,
  WrapOptionalTooltip,
  romanize,
  getSelectComponentPlaceholder,
  escapeStringRegexp
}

export { Utils }
