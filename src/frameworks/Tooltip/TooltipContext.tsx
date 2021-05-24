import React from 'react'
import { TooltipContextProviderProps, TooltipContextValue } from './types'

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
