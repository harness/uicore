/*
 * Copyright 2019 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { renderHook, act } from '@testing-library/react-hooks'
import { useToggle, useToggleWithLocalStorage, useToggleOpen } from './useToggle'

test('useToggle with default value', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useToggle())

  await act(async () => {
    expect(result.current[0]).toEqual(false)
    result.current[1]()
    await waitForNextUpdate()
    expect(result.current[0]).toEqual(true)
  })
})

test('useToggle with default value passed', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useToggle(true))

  await act(async () => {
    expect(result.current[0]).toEqual(true)
    result.current[1]()
    await waitForNextUpdate()
    expect(result.current[0]).toEqual(false)
  })
})

test('useToggleWithLocalStorage with default value', async () => {
  const KEY = 'useToggleWithLocalStorage1'
  const { result, waitForNextUpdate } = renderHook(() => useToggleWithLocalStorage(KEY))

  await act(async () => {
    expect(result.current[0]).toEqual(false)
    expect(window.localStorage[KEY]).toEqual('false')
    result.current[1]()
    await waitForNextUpdate()
    expect(result.current[0]).toEqual(true)
    expect(window.localStorage[KEY]).toEqual('true')
  })
})

test('useToggleWithLocalStorage with default value passed', async () => {
  const KEY = 'useToggleWithLocalStorage2'
  const { result, waitForNextUpdate } = renderHook(() => useToggleWithLocalStorage(KEY, true))

  await act(async () => {
    expect(result.current[0]).toEqual(true)
    expect(window.localStorage[KEY]).toEqual('true')
    result.current[1]()
    await waitForNextUpdate()
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
