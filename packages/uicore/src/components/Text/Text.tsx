/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes, useRef, useState, useCallback, useMemo } from 'react'
import { debounce } from 'lodash-es'
import cx from 'classnames'
import { StyledProps, styledClasses, omitStyledProps } from '@harness/design-system'
import { styledClass } from '@harness/design-system'
import { OptionalTooltip } from '@harness/design-system'
import { Utils } from '../../core/Utils'
import css from './Text.css'
import { Icon, IconName, IconProps } from '@harness/icons'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'

export interface TextProps extends HTMLAttributes<HTMLDivElement>, StyledProps, OptionalTooltip {
  // When lineClamp is specified, show ... (ellipsis) when text is overflown and show the full text
  // in a tooltip on hover. Note that `tooltip` prop takes precedence over this prop.
  // See more: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  lineClamp?: number

  /** When true, tooltip will always be shown (even in case lineClamp event is not triggered: no `...` is rendered)  */
  alwaysShowTooltip?: boolean

  /** Left icon */
  icon?: IconName

  /** Optional props for left icon */
  iconProps?: Partial<IconProps>

  /** Right icon */
  rightIcon?: IconName

  /** Optional props for right icon */
  rightIconProps?: Partial<IconProps>

  /** Optional HTML tag. Default is 'p' */
  tag?: string
}

export function Text(props: TextProps): JSX.Element {
  const { icon, iconProps, rightIcon, rightIconProps, alwaysShowTooltip, lineClamp } = props
  const Tag = (props.tag ? props.tag : props.inline ? 'span' : 'p') as React.ElementType
  const [isScrollable, setIsScrollable] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const observerRef = useRef<ResizeObserver>()
  const style = { ...props.style }

  if (lineClamp) {
    ;(style as any)['--text-line-clamp'] = lineClamp // eslint-disable-line
  }

  if (icon || rightIcon) {
    ;(style as any)['display'] = props.inline ? 'inline-flex' : 'flex' // eslint-disable-line
    ;(style as any)['alignItems'] = 'center' // eslint-disable-line
  }

  const onResize = useMemo(
    () =>
      debounce(() => {
        if (!ref.current) return

        const element = ref.current
        const heightDifference = (element.scrollHeight || 0) - (element.offsetHeight || 0)
        const widthDifference = (element.scrollWidth || 0) - (element.offsetWidth || 0)

        // Reason to consider difference more than 1 px is
        // If height is 18.2 Px, chrome taking scrollHeight as 18px and firefox take this as 19px
        // where as offsetHeight both take it as 18px
        setIsScrollable(heightDifference > 1 || widthDifference > 1)
      }, 300),
    []
  )

  const refCallback = useCallback(
    (el: HTMLElement | null) => {
      ref.current = el
      observerRef.current?.disconnect()

      if (!ref.current || !lineClamp || !('ResizeObserver' in window)) return
      observerRef.current = new ResizeObserver(onResize)
      observerRef.current.observe(ref.current)
    },
    [lineClamp]
  )

  const tooltip = (() => {
    if (props.tooltip && (alwaysShowTooltip || !lineClamp)) {
      return props.tooltip
    }

    if (isScrollable && lineClamp && lineClamp > 0) {
      return props.tooltip || (props.children as JSX.Element)
    }

    return undefined
  })()

  const wrappedInTooltip = (
    <Utils.WrapOptionalTooltip
      tooltip={tooltip}
      tooltipProps={{
        ...props.tooltipProps,
        targetClassName: cx(css.targetClass, props.tooltipProps?.targetClassName)
      }}>
      <Tag
        {...omitStyledProps(
          Object.assign({}, props, { style }),
          'tooltip',
          'tooltipProps',
          'lineClamp',
          'icon',
          'iconProps',
          'rightIcon',
          'rightIconProps',
          'tag'
        )}
        className={styledClasses(props, styledClass.font, lineClamp && lineClamp >= 1 && css.lineclamp)}
        ref={refCallback}>
        {icon && <Icon className={css.icon} name={icon} size={16} padding={{ right: 'xsmall' }} {...iconProps} />}
        {props.children}
        {rightIcon && (
          <Icon className={css.icon} name={rightIcon} size={16} padding={{ left: 'xsmall' }} {...rightIconProps} />
        )}
      </Tag>
    </Utils.WrapOptionalTooltip>
  )

  return props.tooltipProps?.dataTooltipId ? (
    <div className={css.withDocsTooltip} data-tooltip-id={props.tooltipProps?.dataTooltipId}>
      {wrappedInTooltip}
      <HarnessDocTooltip tooltipId={props.tooltipProps?.dataTooltipId} useStandAlone={true} />
    </div>
  ) : (
    wrappedInTooltip
  )
}

export const SupText: React.FC<TextProps> = props => (
  <sup>
    <Text inline font="xsmall" style={{ padding: '0 2px', marginLeft: 2 }} color="red500" {...props} />
  </sup>
)
