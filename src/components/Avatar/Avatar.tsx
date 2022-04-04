/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { HTMLDivProps, Popover } from '@blueprintjs/core'
import React, { useState } from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
import { getInitialsFromNameOrEmail, getSumOfAllCharacters, defaultAvatarColor } from './utils'
import { FontSize } from '@harness/design-system'
import { Utils } from '../../core/Utils'
import { Color } from '@harness/design-system'
import { Container } from '../../components/Container/Container'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { Icon, IconProps } from '@harness/icons'
export type AvatarSizes = FontSize
export interface AvatarProps extends HTMLDivProps {
  name?: string
  src?: string
  backgroundColor?: Color | Color[]
  email?: string
  size?: AvatarSizes
  borderRadius?: number
  borderColor?: Color
  color?: Color
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  hoverCard?: boolean
  tooltip?: JSX.Element
  hoverCardDetailsCallBack?: (e: React.MouseEvent<HTMLDivElement>) => void
}
export const plusIcon = '+'
interface SizeValueProps {
  size: string
  fontSize: string
  lineHeight: string
  imageHeight: string
  plusIconLineHeight: string
}
type SizesProps = {
  [key in AvatarSizes]: SizeValueProps
}
const sizes: SizesProps = {
  xsmall: {
    size: '16px',
    fontSize: '7px',
    lineHeight: '12px',
    imageHeight: '12px',
    plusIconLineHeight: '10px'
  },
  small: {
    size: '24px',
    fontSize: '10px',
    lineHeight: '18px',
    imageHeight: '20px',
    plusIconLineHeight: '16px'
  },
  normal: {
    size: '32px',
    fontSize: '10px',
    lineHeight: '26px',
    imageHeight: '28px',
    plusIconLineHeight: '25px'
  },
  medium: {
    size: '48px',
    fontSize: '18px',
    lineHeight: '42px',
    imageHeight: '44px',
    plusIconLineHeight: '40px'
  },
  large: {
    size: '72px',
    fontSize: '28px',
    lineHeight: '66px',
    imageHeight: '68px',
    plusIconLineHeight: '60px'
  }
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const [loadFailed, setLoadFailed] = useState(false)
  const onLoadFailed = () => setLoadFailed(true)
  const {
    borderRadius = 100,
    src,
    name = '',
    backgroundColor = defaultAvatarColor,
    size = 'normal',
    style,
    className,
    email = '',
    tooltip,
    color = Color.WHITE,
    onClick,
    hoverCard = true,
    borderColor = Color.WHITE,
    hoverCardDetailsCallBack,
    ...rest
  } = props
  let textColor = color
  const formatedSize = sizes[size].size
  const fontSize = sizes[size].fontSize
  const lineHeight = sizes[size].lineHeight
  const imageHeightWidth = sizes[size].imageHeight
  let inner
  let initials = ''
  if (!src) {
    initials = getInitialsFromNameOrEmail(name, email)
  }
  // sum of characters will be used to decide the background color for that avatar
  const sumOfCharacters = Math.abs(getSumOfAllCharacters(initials))
  let calucatedBackgroundColor = Array.isArray(backgroundColor)
    ? backgroundColor[sumOfCharacters % backgroundColor.length]
    : backgroundColor
  if (textColor === calucatedBackgroundColor) {
    textColor = Color.WHITE
    calucatedBackgroundColor = Color.BLACK
  }
  const contentStyle = {
    borderRadius: `${borderRadius}%`,
    lineHeight,
    width: formatedSize,
    height: formatedSize,
    ...(!src && {
      backgroundColor: Utils.getRealCSSColor(calucatedBackgroundColor || 'BLUE_800'),
      color: Utils.getRealCSSColor(textColor)
    }),
    border: `2px solid ${Utils.getRealCSSColor(borderColor)}`,
    ...(fontSize && { fontSize })
  }
  if (src) {
    const parsedHeightWidth = parseInt(imageHeightWidth, 10) as IconProps['size']
    const imageStyleNew = { ...contentStyle, width: imageHeightWidth, height: imageHeightWidth, border: '' }
    inner = loadFailed ? (
      <Icon name="user" size={parsedHeightWidth} />
    ) : (
      <img src={src} style={imageStyleNew} className={css.imageStyle} alt={name} onError={onLoadFailed} />
    )
  } else {
    if (!initials) {
      return null
    }
    inner = initials
    inner = inner.toUpperCase()
  }
  const toolTipStyle = {
    ...contentStyle,
    width: sizes.medium.size,
    height: sizes.medium.size,
    fontSize: sizes.medium.fontSize,
    lineHeight: sizes.medium.lineHeight,
    borderRadius: '100%'
  }

  const parsedHeightWidthInTooltip = parseInt(sizes.medium.size, 10) as IconProps['size']

  const defaultTooltip = (
    <Layout.Vertical className={css.hoverToolTipLayout}>
      <Layout.Horizontal flex padding="medium" className={css.hoverAvatarLayout}>
        {src ? (
          loadFailed ? (
            <Icon name="user" size={parsedHeightWidthInTooltip} className={css.avatarImg} />
          ) : (
            <img
              className={css.avatarImg}
              src={src}
              style={{ ...toolTipStyle, textAlign: 'center', minWidth: sizes.medium.size }}
              alt={name}
              onError={onLoadFailed}
            />
          )
        ) : (
          <div className={css.avatarImg} style={{ ...toolTipStyle, textAlign: 'center', minWidth: sizes.medium.size }}>
            {inner}
          </div>
        )}

        <Text margin={{ bottom: 'small' }} font={{ size: 'small', weight: 'bold' }} color={Color.BLACK} lineClamp={1}>
          {name}
        </Text>
      </Layout.Horizontal>

      {(email || hoverCardDetailsCallBack) && (
        <Container padding="medium">
          {email && (
            <Text
              margin={{ top: 'small' }}
              font={{ size: 'small' }}
              icon="email-inline"
              iconProps={{ color: 'grey600', size: 10 }}
              lineClamp={1}
              className={css.emailHover}>
              {email}
            </Text>
          )}
          {hoverCardDetailsCallBack && (
            <Text
              font={{ size: 'xsmall' }}
              margin={{ top: 'small' }}
              color="primary7"
              lineClamp={1}
              onClick={hoverCardDetailsCallBack}>
              Details
            </Text>
          )}
        </Container>
      )}
    </Layout.Vertical>
  )
  let hoverCardContent = {}
  if (hoverCard) {
    hoverCardContent = { content: tooltip || defaultTooltip }
  }
  const getUpdatedContentStyle = () => {
    if (name === plusIcon) {
      return {
        ...contentStyle,
        fontSize: `${2 * parseInt(sizes[size].fontSize, 10)}px`,
        lineHeight: sizes[size].plusIconLineHeight,
        fontWeight: 200
      }
    } else {
      return contentStyle
    }
  }
  return (
    <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick} {...rest}>
      <Popover
        {...hoverCardContent}
        interactionKind="hover"
        usePortal={false}
        className={css.avatarPopOver}
        position="top"
        disabled={!hoverCard}>
        <div className={css.AvatarInner} style={getUpdatedContentStyle()}>
          {inner}
        </div>
      </Popover>
    </div>
  )
}
