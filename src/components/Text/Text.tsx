/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes, useRef, useLayoutEffect, useState, useEffect } from 'react'
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

export function Text(props: TextProps) {
  const Tag = (props.tag ? props.tag : props.inline ? 'span' : 'p') as React.ElementType
  const [tooltip, setTooltip] = useState(props.tooltip)
  const lineClamp = props.lineClamp
  const style = { ...props.style }
  const ref = useRef<HTMLElement>()
  const { icon, iconProps, rightIcon, rightIconProps, alwaysShowTooltip } = props

  if (lineClamp) {
    ;(style as any)['--text-line-clamp'] = lineClamp // eslint-disable-line
  }

  if (icon || rightIcon) {
    ;(style as any)['display'] = props.inline ? 'inline-flex' : 'flex' // eslint-disable-line
    ;(style as any)['alignItems'] = 'center' // eslint-disable-line
  }

  useLayoutEffect(() => {
    const renderTooltip = () => {
      const heightDifference = (ref.current?.scrollHeight || 0) - (ref.current?.offsetHeight || 0)
      const widthDifference = (ref.current?.scrollWidth || 0) - (ref.current?.offsetWidth || 0)
      // Reason to consider difference more than 1 px is
      // If height is 18.2 Px, chrome taking scrollHeight as 18px and firefox take this as 19px
      // where as offsetHeight both take it as 18px
      if (lineClamp && lineClamp > 0 && (heightDifference > 1 || widthDifference > 1)) {
        setTooltip(props.tooltip || (props.children as JSX.Element))
      } else {
        setTooltip(undefined)
      }
    }

    renderTooltip()
    addEventListener('resize', renderTooltip)

    return () => {
      removeEventListener('resize', renderTooltip)
    }
  }, [props.children, props.tooltip, props.tooltipProps])

  useEffect(() => {
    if ((!lineClamp || alwaysShowTooltip) && props.tooltip) {
      setTooltip(props.tooltip)
    }
  }, [lineClamp, props.tooltip, alwaysShowTooltip])

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
        ref={ref}>
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
