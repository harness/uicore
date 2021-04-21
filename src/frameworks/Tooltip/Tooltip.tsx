import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'
import { useTooltipContext } from './TooltipContext'
import { TooltipRenderProps, UseTooltipsReturn } from './types'

import css from './Tooltip.css'

export function useTooltips(): UseTooltipsReturn {
  const { getTooltip, tooltipDictionary } = useTooltipContext()

  return {
    getTooltip(key: string, vars: Record<string, any> = {}): string {
      if (typeof getTooltip === 'function') {
        return getTooltip(key, vars)
      }
      return tooltipDictionary[key]
    },
    tooltipDictionary
  }
}

export const HarnessDocTooltip = ({
  tooltipId,
  useStandAlone = false,
  getTooltipAdditionalVars,
  labelText
}: TooltipRenderProps) => {
  const { getTooltip } = useTooltips()
  const tooltipContent = getTooltip(tooltipId || '', getTooltipAdditionalVars)
  const tooltipJsxComponent = (
    <Tooltip content={tooltipContent}>
      <span data-tooltip-id={tooltipId} className={css.tooltipIcon}>
        <Icon iconSize={12} icon="help" />
      </span>
    </Tooltip>
  )
  if (tooltipContent && useStandAlone) {
    return tooltipJsxComponent
  } else if (tooltipContent && !useStandAlone) {
    return (
      <span className={css.acenter} data-tooltip-id={tooltipId}>
        {labelText}
        {tooltipJsxComponent}
      </span>
    )
  }
  return <>{labelText}</>
}
