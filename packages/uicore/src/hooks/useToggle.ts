/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useState } from 'react'

type UseToggleResult = [boolean, () => void]

const TRUE = 'true'
const FALSE = 'false'
const VALUES = ['true', 'false']

export function useToggle(initialState = false): UseToggleResult {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => {
    setState(state => !state)
  }, [])

  return [state, toggle]
}

export function useToggleWithLocalStorage(localStorageKey: string, initialState = false): UseToggleResult {
  const valueInLS = localStorage[localStorageKey]
  const existInLS = VALUES.includes(valueInLS)
  const value = existInLS ? valueInLS === TRUE : !!initialState
  const [state, setState] = useState(value)
  const toggle = useCallback(() => {
    localStorage[localStorageKey] = localStorage[localStorageKey] === FALSE ? TRUE : FALSE
    setState(state => !state)
  }, [])

  if (!existInLS) {
    localStorage[localStorageKey] = value
  }

  return [state, toggle]
}

export interface UseToggleOpenReturn {
  isOpen: boolean
  open(): void
  close(): void
  toggle(): void
}

export function useToggleOpen(init = false): UseToggleOpenReturn {
  const [isOpen, setIsOpen] = useState(init)
  const toggle = useCallback(() => {
    setIsOpen(state => !state)
  }, [])
  const open = useCallback(() => {
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    open,
    close,
    toggle
  }
}
