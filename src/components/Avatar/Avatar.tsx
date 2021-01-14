import { HTMLDivProps, Popover } from '@blueprintjs/core'
import React from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
import { getInitialsFromNameOrEmail, getSumOfAllCharacters, defaultAvatarColor } from './utils'
import { FontSize } from 'styled-props/font/FontProps'
import { Utils } from '../../core/Utils'
import { Color } from '../../core/Color'
import { Container } from '../../components/Container/Container'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
export type AvatarSizes = FontSize
export interface AvatarProps extends HTMLDivProps {
  name?: string
  src?: string
  backgroundColor?: Color | Color[]
  email?: string
  size?: AvatarSizes
  borderRadius?: number
  color?: Color
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  hoverCard?: boolean
  hoverCardDetailsCallBack?: (e: React.MouseEvent<HTMLDivElement>) => void
}
interface SizeValueProps {
  size: string
  fontSize: string
  lineHeight: string
}
type SizesProps = {
  [key in AvatarSizes]: SizeValueProps
}
const sizes: SizesProps = {
  xsmall: { size: '16px', fontSize: '7px', lineHeight: '12px' },
  small: { size: '24px', fontSize: '10px', lineHeight: '20px' },
  normal: { size: '32px', fontSize: '10px', lineHeight: '28px' },
  medium: { size: '48px', fontSize: '18px', lineHeight: '44px' },
  large: { size: '72px', fontSize: '28px', lineHeight: '68px' }
}

export const Avatar = (props: AvatarProps) => {
  const {
    borderRadius = 100,
    src,
    name = '',
    backgroundColor = defaultAvatarColor,
    size = 'normal',
    style,
    className,
    email = '',
    color = Color.WHITE,
    onClick,
    hoverCard = true,
    hoverCardDetailsCallBack,
    ...rest
  } = props
  let textColor = color
  const formatedSize = sizes[size].size
  const fontSize = sizes[size].fontSize
  const lineHeight = sizes[size].lineHeight
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
    border: '2px solid var(--white)',
    ...(fontSize && { fontSize })
  }
  if (src) {
    inner = <img src={src} style={contentStyle} className={css.imageStyle} alt={name} />
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

  const tooltip = (
    <Layout.Vertical className={css.hoverToolTipLayout}>
      <Layout.Horizontal flex padding="small" className={css.hoverAvatarLayout}>
        {src ? (
          <img src={src} style={{ ...toolTipStyle, textAlign: 'center', minWidth: sizes.medium.size }} alt={name} />
        ) : (
          <div style={{ ...toolTipStyle, textAlign: 'center', minWidth: sizes.medium.size }}>{inner}</div>
        )}

        <Text lineClamp={1}>{name}</Text>
      </Layout.Horizontal>
      <Container padding="small">
        {email && (
          <Text
            icon="command-email"
            iconProps={{ color: 'grey300', size: 18 }}
            lineClamp={1}
            className={css.emailHover}>
            {email}
          </Text>
        )}
      </Container>
      <Container padding="small">
        {hoverCardDetailsCallBack && (
          <Text color="blue500" lineClamp={1} onClick={hoverCardDetailsCallBack}>
            Details
          </Text>
        )}
      </Container>
    </Layout.Vertical>
  )

  return (
    <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick} {...rest}>
      {hoverCard ? (
        <Popover content={tooltip} interactionKind="hover" usePortal={false}>
          <div className={css.AvatarInner} style={contentStyle}>
            {inner}
          </div>
        </Popover>
      ) : (
        <div className={css.AvatarInner} style={contentStyle}>
          {inner}
        </div>
      )}
    </div>
  )
}
