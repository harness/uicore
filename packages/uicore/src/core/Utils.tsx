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

export const COUNTRY_TO_DIALING_CODE_MAP: Record<string, string> = {
  'United States': '+1',
  Canada: '+1',
  Afghanistan: '+93',
  Albania: '+355',
  Algeria: '+213',
  Andorra: '+376',
  Angola: '+244',
  Anguilla: '+1-264',
  'Antigua & Barbuda': '+1-268',
  Argentina: '+54',
  Armenia: '+374',
  Australia: '+61',
  Austria: '+43',
  Azerbaijan: '+994',
  Bahamas: '+1-242',
  Bahrain: '+973',
  Bangladesh: '+880',
  Barbados: '+1-246',
  Belarus: '+375',
  Belgium: '+32',
  Belize: '+501',
  Benin: '+229',
  Bermuda: '+1-441',
  Bhutan: '+975',
  Bolivia: '+591',
  'Bosnia & Herzegovina': '+387',
  Botswana: '+267',
  Brazil: '+55',
  'British Virgin Islands': '+1-284',
  'Brunei Darussalam': '+673',
  Bulgaria: '+359',
  'Burkina Faso': '+226',
  Burundi: '+257',
  Cambodia: '+855',
  Cameroon: '+237',
  'Cape Verde': '+238',
  'Cayman Islands': '+1-345',
  'Central African Republic': '+236',
  Chad: '+235',
  Chile: '+56',
  China: '+86',
  Colombia: '+57',
  Comoros: '+269',
  'Costa Rica': '+506',
  Croatia: '+385',
  Cuba: '+53',
  Cyprus: '+357',
  'Czech Republic': '+420',
  'Democratic Republic of the Congo': '+243',
  Denmark: '+45',
  Djibouti: '+253',
  Dominica: '+1-767',
  'Dominican Republic': '+1-809',
  'East Timor': '+670',
  Ecuador: '+593',
  Egypt: '+20',
  'El Salvador': '+503',
  'Equatorial Guinea': '+240',
  Eritrea: '+291',
  Estonia: '+372',
  Ethiopia: '+251',
  Fiji: '+679',
  Finland: '+358',
  France: '+33',
  Gabon: '+241',
  Gambia: '+220',
  Georgia: '+995',
  Germany: '+49',
  Ghana: '+233',
  Greece: '+30',
  Grenada: '+1-473',
  Guatemala: '+502',
  Guinea: '+224',
  'Guinea-Bissau': '+245',
  Guyana: '+592',
  Haiti: '+509',
  Honduras: '+504',
  'Hong Kong': '+852',
  Hungary: '+36',
  Iceland: '+354',
  India: '+91',
  Indonesia: '+62',
  Iraq: '+964',
  Ireland: '+353',
  Israel: '+972',
  Italy: '+39',
  'Ivory Coast': '+225',
  Jamaica: '+1-876',
  Japan: '+81',
  Jordan: '+962',
  Kazakhstan: '+7',
  Kenya: '+254',
  'Korea, Republic of (South Korea)': '+82',
  Kosovo: '+383',
  Kuwait: '+965',
  Kyrgyzstan: '+996',
  Laos: '+856',
  Latvia: '+371',
  Lesotho: '+266',
  Liberia: '+231',
  Liechtenstein: '+423',
  Lithuania: '+370',
  Luxembourg: '+352',
  Macedonia: '+389',
  Madagascar: '+261',
  Malawi: '+265',
  Malaysia: '+60',
  Maldives: '+960',
  Mali: '+223',
  Malta: '+356',
  Mauritania: '+222',
  Mauritius: '+230',
  Mayotte: '+262',
  Mexico: '+52',
  Moldova: '+373',
  Monaco: '+377',
  Mongolia: '+976',
  Montenegro: '+382',
  Montserrat: '+1-664',
  Morocco: '+212',
  Mozambique: '+258',
  Myanmar: '+95',
  Namibia: '+264',
  Nepal: '+977',
  Netherlands: '+31',
  'New Zealand': '+64',
  Nicaragua: '+505',
  Niger: '+227',
  Nigeria: '+234',
  Norway: '+47',
  Oman: '+968',
  Pakistan: '+92',
  Panama: '+507',
  'Papua New Guinea': '+675',
  Paraguay: '+595',
  Peru: '+51',
  Philippines: '+63',
  Poland: '+48',
  Portugal: '+351',
  'Puerto Rico': '+1-787',
  Qatar: '+974',
  'Republic of the Congo': '+242',
  Reunion: '+262',
  Romania: '+40',
  Russia: '+7',
  Rwanda: '+250',
  'Saint Kitts and Nevis': '+1-869',
  'Saint Lucia': '+1-758',
  'Saint Vincent and the Grenadines': '+1-784',
  Samoa: '+685',
  'Sao Tome and Principe': '+239',
  'Saudi Arabia': '+966',
  Senegal: '+221',
  Serbia: '+381',
  Seychelles: '+248',
  'Sierra Leone': '+232',
  Singapore: '+65',
  Slovakia: '+421',
  Slovenia: '+386',
  'Solomon Islands': '+677',
  'South Africa': '+27',
  'South Sudan': '+211',
  Spain: '+34',
  'Sri Lanka': '+94',
  Suriname: '+597',
  Sweden: '+46',
  Switzerland: '+41',
  Taiwan: '+886',
  Tajikistan: '+992',
  Tanzania: '+255',
  Thailand: '+66',
  Togo: '+228',
  'Trinidad and Tobago': '+1-868',
  Tunisia: '+216',
  Turkey: '+90',
  Turkmenistan: '+993',
  'Turks and Caicos Islands': '+1-649',
  'U.S. Virgin Islands': '+1-340',
  Uganda: '+256',
  Ukraine: '+380',
  'United Arab Emirates': '+971',
  'United Kingdom': '+44',
  Uruguay: '+598',
  Uzbekistan: '+998',
  Venezuela: '+58',
  Vietnam: '+84',
  Yemen: '+967',
  Zambia: '+260',
  Zimbabwe: '+263'
}

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
  const { isDark = false, boundary = 'viewport', position = 'top', interactionKind = 'hover' } = tooltipProps ?? {}
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
      boundary={boundary}
      position={position}
      interactionKind={interactionKind}
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
  escapeStringRegexp,
  COUNTRY_TO_DIALING_CODE_MAP
}

export { Utils }
