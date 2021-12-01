import React, { ReactNode } from 'react'

export interface DataTooltipInterface {
  dataTooltipId: string
}

export interface TooltipDictionaryValue {
  content: string
  width: number | string
}

export interface TooltipDictionaryInterface {
  [tooltipId: string]: string | TooltipDictionaryValue
}

export interface UseTooltipsReturn {
  getTooltip(key: string, vars?: Record<string, any>): string | TooltipDictionaryValue
  tooltipDictionary: TooltipDictionaryInterface
}

export interface TooltipRenderProps {
  tooltipId?: string
  getTooltipAdditionalVars?: Record<string, string>
  labelText?: ReactNode | null
  useStandAlone?: boolean
  className?: string
  contentFromParent?: string | TooltipDictionaryValue
}

export interface TooltipContextValue {
  getTooltip?(key: string, vars?: Record<string, any>): string | TooltipDictionaryValue
  tooltipDictionary: TooltipDictionaryInterface
}

export interface TooltipContextProviderProps extends Pick<TooltipContextValue, 'getTooltip'> {
  children: React.ReactNode
  initialTooltipDictionary?: TooltipDictionaryInterface
}
