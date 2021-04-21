import React from 'react'

export const tooltipDictionary: Record<string, string> = {
  tagInputId: 'Sample tag input tooltip',
  idforexpressioninput: 'idforexpressioninput'
}

export interface TooltipContextValue {
  tooltipDictionary: Record<string, string>
  getTooltip?(key: string, vars?: Record<string, any>): string
}

export const TooltipContext = React.createContext<TooltipContextValue>({ tooltipDictionary } as TooltipContextValue)

export function useTooltipContext(): TooltipContextValue {
  return React.useContext(TooltipContext)
}
