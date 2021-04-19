export interface DataTooltipInterface {
  dataTooltipId: string
  dataTooltipFor?: string
}

export interface UseTooltipsReturn {
  getTooltip(key: string, vars?: Record<string, any>): string
}
