/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(arg: unknown): arg is Function {
  return typeof arg === 'function'
}

export function useLocalStorage<T>(key: string, initalValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item && item !== 'undefined' ? JSON.parse(item) : initalValue
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return initalValue
    }
  })

  function setItem(value: SetStateAction<T>): void {
    try {
      const valueToSet = isFunction(value) ? value(state) : value

      setState(valueToSet)
      window.localStorage.setItem(key, JSON.stringify(valueToSet))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  return [state, setItem]
}
