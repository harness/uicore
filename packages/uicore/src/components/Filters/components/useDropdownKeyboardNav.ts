/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseDropdownKeyboardNavOptions {
  filteredItemsLength: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

interface UseDropdownKeyboardNavResult {
  focusedIndex: number
  resetFocus: () => void
  popoverContentRef: React.RefObject<HTMLDivElement>
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export function useDropdownKeyboardNav({
  filteredItemsLength,
  isOpen,
  setIsOpen
}: UseDropdownKeyboardNavOptions): UseDropdownKeyboardNavResult {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const popoverContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
      return
    }
    if (focusedIndex >= 0 && popoverContentRef.current) {
      popoverContentRef.current.querySelector('[data-focused="true"]')?.scrollIntoView({ block: 'nearest' })
    }
  }, [isOpen, focusedIndex])

  const onSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => (prev < filteredItemsLength - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : filteredItemsLength - 1))
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [filteredItemsLength, setIsOpen]
  )

  const resetFocus = useCallback(() => setFocusedIndex(-1), [])

  return { focusedIndex, resetFocus, popoverContentRef, onSearchKeyDown }
}
