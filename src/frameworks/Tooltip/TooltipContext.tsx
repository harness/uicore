/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { UseTooltipsReturn } from 'index'
import React from 'react'
import { TooltipContextProviderProps, TooltipContextValue, TooltipDictionaryValue } from './types'

export const TooltipContext = React.createContext<TooltipContextValue>({ tooltipDictionary: {} })

export function TooltipContextProvider(props: TooltipContextProviderProps): React.ReactElement {
  return (
    <TooltipContext.Provider
      value={{
        tooltipDictionary: props.initialTooltipDictionary || {},
        getTooltip: props.getTooltip
      }}>
      {props.children}
    </TooltipContext.Provider>
  )
}

export function useTooltipContext(): TooltipContextValue {
  return React.useContext(TooltipContext)
}

export function useTooltips(): UseTooltipsReturn {
  const { getTooltip, tooltipDictionary } = useTooltipContext()

  return {
    getTooltip(key: string, vars: Record<string, any> = {}): TooltipDictionaryValue | string {
      if (typeof getTooltip === 'function') {
        return getTooltip(key, vars)
      }
      return tooltipDictionary[key] ? tooltipDictionary[key] : ''
    },
    tooltipDictionary
  }
}
