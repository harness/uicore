import React from 'react'
import cx from 'classnames'
import marked from 'marked'
import { PopoverInteractionKind } from '@blueprintjs/core'
import { useTooltips } from './TooltipContext'
import { TooltipRenderProps } from './types'

import css from './Tooltip.css'
import { Popover } from '../../components/Popover/Popover'
import { Icon } from '../../icons/Icon'
import { Color } from '../../core/Color'

const _asHtml = (content: string) => {
  return `${content
    .split('\n\n')
    .map(line => `<p>${marked(line).replace(new RegExp('href=', 'g'), 'target="_blank" href=')}</p>`)
    .join('')}`
}

export const HarnessDocTooltip = ({
  tooltipId,
  useStandAlone = false,
  getTooltipAdditionalVars,
  labelText,
  className: propsClassName,
  contentFromParent
}: TooltipRenderProps): JSX.Element => {
  const { getTooltip } = useTooltips()
  const tooltipContent = contentFromParent || getTooltip(tooltipId || '', getTooltipAdditionalVars)

  const asString = typeof tooltipContent === 'object' ? tooltipContent.content : tooltipContent
  const widthValue = typeof tooltipContent === 'object' && tooltipContent.width
  const customWidth = widthValue ? Number(widthValue) : 400
  const tooltipContentHtml = _asHtml(asString)

  const tooltipJsxComponent = (
    <Popover
      popoverClassName={css.tooltipWrapper}
      position="auto"
      interactionKind={PopoverInteractionKind.HOVER}
      content={
        <div
          className={css.tooltipContentWrapper}
          style={{ maxWidth: `${customWidth}px` }}
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: tooltipContentHtml }}
        />
      }>
      <span className={css.tooltipIcon}>
        <Icon size={16} name="tooltip-icon" color={Color.PRIMARY_7} />
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
