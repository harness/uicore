/*
 * Copyright 2019 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
