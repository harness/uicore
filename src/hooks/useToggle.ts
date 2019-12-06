import { useCallback, useState } from 'react'

type UseToggleResult = [boolean, () => void]

export function useToggle(initialState = false): UseToggleResult {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => {
    setState(state => !state)
  }, [])

  return [state, toggle]
}

export function useToggleWithLocalStorage(localStorageKey: string, initialState = false): UseToggleResult {
  const TRUE = 'true',
    FALSE = 'false',
    VALUES = ['true', 'false']
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
