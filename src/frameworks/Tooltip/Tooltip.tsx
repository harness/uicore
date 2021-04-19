import { useTooltipContext } from './TooltipContext'
import { UseTooltipsReturn } from './types'

const tooltipMap: Record<string, string> = {
  tagInputId: 'Sample tag input tooltip'
}

export function useTooltips(): UseTooltipsReturn {
  const { getTooltip } = useTooltipContext()

  return {
    getTooltip(key: string, vars: Record<string, any> = {}) {
      if (typeof getTooltip === 'function') {
        return getTooltip(key, vars)
      }
      return tooltipMap[key]
    }
  }
}
