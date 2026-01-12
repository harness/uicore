/*
 * Copyright 2019 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { useToggle, useToggleWithLocalStorage, useToggleOpen } from './useToggle'

test('useToggle with default value', async () => {
  const { result } = renderHook(() => useToggle())

  expect(result.current[0]).toEqual(false)
  act(() => {
    result.current[1]()
  })
  await waitFor(() => {
    expect(result.current[0]).toEqual(true)
  })
})

test('useToggle with default value passed', async () => {
  const { result } = renderHook(() => useToggle(true))

  expect(result.current[0]).toEqual(true)
  act(() => {
    result.current[1]()
  })
  await waitFor(() => {
    expect(result.current[0]).toEqual(false)
  })
})

test('useToggleWithLocalStorage with default value', async () => {
  const KEY = 'useToggleWithLocalStorage1'
  const { result } = renderHook(() => useToggleWithLocalStorage(KEY))

  expect(result.current[0]).toEqual(false)
  expect(window.localStorage[KEY]).toEqual('false')
  act(() => {
    result.current[1]()
  })
  await waitFor(() => {
    expect(result.current[0]).toEqual(true)
    expect(window.localStorage[KEY]).toEqual('true')
  })
})

test('useToggleWithLocalStorage with default value passed', async () => {
  const KEY = 'useToggleWithLocalStorage2'
  const { result } = renderHook(() => useToggleWithLocalStorage(KEY, true))

  expect(result.current[0]).toEqual(true)
  expect(window.localStorage[KEY]).toEqual('true')
  act(() => {
    result.current[1]()
  })
  await waitFor(() => {
    expect(result.current[0]).toEqual(false)
    expect(window.localStorage[KEY]).toEqual('false')
  })
})

describe('useToggleOpen tests', () => {
  test('open works', () => {
    const { result } = renderHook(() => useToggleOpen())
    expect(result.current.isOpen).toBe(false)
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
  })

  test('close works', () => {
    const { result } = renderHook(() => useToggleOpen(true))
    expect(result.current.isOpen).toBe(true)
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })

  test('toggle works', () => {
    const { result } = renderHook(() => useToggleOpen())
    expect(result.current.isOpen).toBe(false)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(true)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(false)
  })
})
