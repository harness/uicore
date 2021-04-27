import { ReactNode } from 'react'

export interface DataTooltipInterface {
  dataTooltipId: string
}

export interface UseTooltipsReturn {
  getTooltip(key: string, vars?: Record<string, any>): string
  tooltipDictionary: Record<string, string>
}

export interface TooltipRenderProps {
  tooltipId?: string
  getTooltipAdditionalVars?: Record<string, string>
  labelText?: ReactNode | null
  useStandAlone?: boolean
}
