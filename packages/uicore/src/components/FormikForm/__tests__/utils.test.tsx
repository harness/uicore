/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
