/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { get } from 'lodash-es'
import { escapeNewlines } from '../utils'

describe('escapeNewlines Tests', () => {
  test('escapeNewlines should return number without processing', () => {
    const _inputValue = get({ name: 'formikObject', value: 3 }, 'value', '')
    const _value = escapeNewlines(_inputValue)
    expect(_value).toBe(3)
  })
  test('escapeNewlines should escape the new line characters', () => {
    const _value = escapeNewlines('a\nb')
    expect(_value).toBe('a\\nb')
  })
})
