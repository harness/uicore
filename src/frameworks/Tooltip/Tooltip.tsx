import React from 'react'
import cx from 'classnames'
import snarkdown from 'snarkdown'
import { PopoverInteractionKind, Position } from '@blueprintjs/core'
import { useTooltipContext } from './TooltipContext'
import { TooltipRenderProps, UseTooltipsReturn } from './types'

import css from './Tooltip.css'
import { Popover } from '../../components/Popover/Popover'
import { Icon } from '../../icons/Icon'

export function useTooltips(): UseTooltipsReturn {
  const { getTooltip, tooltipDictionary } = useTooltipContext()

  return {
    getTooltip(key: string, vars: Record<string, any> = {}): string {
      if (typeof getTooltip === 'function') {
        return snarkdown(getTooltip(key, vars))
      }
      return tooltipDictionary[key] ? snarkdown(tooltipDictionary[key]) : ''
    },
    tooltipDictionary
  }
}

const _asHtml = (content: string) => {
  return `${content
    .split('\n\n')
    .map(line => `<p>${snarkdown(line).replace(new RegExp('href=', 'g'), 'target="_blank" href=')}</p>`)
    .join('')}`
}

export const HarnessDocTooltip = ({
  tooltipId,
  useStandAlone = false,
  getTooltipAdditionalVars,
  labelText,
  className: propsClassName,
  contentFromParent
}: TooltipRenderProps) => {
  const { getTooltip } = useTooltips()
  const tooltipContent = contentFromParent || getTooltip(tooltipId || '', getTooltipAdditionalVars)

  const tooltipContentHtml = _asHtml(tooltipContent)

  const tooltipJsxComponent = (
    <Popover
      popoverClassName={css.tooltipWrapper}
      position={Position.TOP}
      interactionKind={PopoverInteractionKind.HOVER}
      // eslint-disable-next-line
      content={<div className={css.tooltipContentWrapper} dangerouslySetInnerHTML={{ __html: tooltipContentHtml }} />}>
      <span className={css.tooltipIcon}>
        <Icon size={12} name="tooltip-icon" />
      </span>
    </Popover>
  )
  if (tooltipId && useStandAlone && tooltipContent) {
    return tooltipJsxComponent
  } else if (tooltipId && !useStandAlone) {
    return (
      <span className={cx(css.acenter, propsClassName)} data-tooltip-id={tooltipId}>
        {labelText}
        {tooltipContent ? tooltipJsxComponent : null}
      </span>
    )
  }
  return <>{labelText}</>
}
