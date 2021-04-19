import React from 'react'

export interface TooltipContextValue {
  data: Record<string, string>
  getTooltip?(key: string, vars?: Record<string, any>): string
}

export const TooltipContext = React.createContext<TooltipContextValue>({} as TooltipContextValue)

export function useTooltipContext(): TooltipContextValue {
  return React.useContext(TooltipContext)
}
