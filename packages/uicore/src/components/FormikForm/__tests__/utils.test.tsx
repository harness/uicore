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
