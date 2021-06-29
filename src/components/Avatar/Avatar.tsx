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
  tooltip?: JSX.Element
  hoverCardDetailsCallBack?: (e: React.MouseEvent<HTMLDivElement>) => void
}
interface SizeValueProps {
  size: string
  fontSize: string
  lineHeight: string
  imageHeight: string
}
type SizesProps = {
  [key in AvatarSizes]: SizeValueProps
}
const sizes: SizesProps = {
  xsmall: { size: '16px', fontSize: '7px', lineHeight: '12px', imageHeight: '12px' },
  small: { size: '24px', fontSize: '10px', lineHeight: '18px', imageHeight: '20px' },
  normal: { size: '32px', fontSize: '10px', lineHeight: '26px', imageHeight: '28px' },
  medium: { size: '48px', fontSize: '18px', lineHeight: '42px', imageHeight: '44px' },
  large: { size: '72px', fontSize: '28px', lineHeight: '66px', imageHeight: '68px' }
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
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
    border: '2px solid var(--white)',
    ...(fontSize && { fontSize })
  }
  if (src) {
    const imageStyleNew = { ...contentStyle, width: imageHeightWidth, height: imageHeightWidth, border: '' }
    inner = <img src={src} style={imageStyleNew} className={css.imageStyle} alt={name} />
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

  const defaultTooltip = (
    <Layout.Vertical className={css.hoverToolTipLayout}>
      <Layout.Horizontal flex padding="small" className={css.hoverAvatarLayout}>
        {src ? (
          <img src={src} style={{ ...toolTipStyle, textAlign: 'center', minWidth: sizes.medium.size }} alt={name} />
        ) : (
          <div style={{ ...toolTipStyle, textAlign: 'center', minWidth: sizes.medium.size }}>{inner}</div>
        )}

        <Text lineClamp={1}>{name}</Text>
      </Layout.Horizontal>

      {email && (
        <Container padding="small">
          <Text
            icon="command-email"
            iconProps={{ color: 'grey300', size: 18 }}
            lineClamp={1}
            className={css.emailHover}>
            {email}
          </Text>
        </Container>
      )}

      {hoverCardDetailsCallBack && (
        <Container padding="small">
          <Text color="blue500" lineClamp={1} onClick={hoverCardDetailsCallBack}>
            Details
          </Text>
        </Container>
      )}
    </Layout.Vertical>
  )
  let hoverCardContent = {}
  if (hoverCard) {
    hoverCardContent = { content: tooltip || defaultTooltip }
  }
  return (
    <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick} {...rest}>
      <Popover
        {...hoverCardContent}
        interactionKind="hover"
        usePortal={false}
        className={css.avatarPopOver}
        disabled={!hoverCard}>
        <div className={css.AvatarInner} style={contentStyle}>
          {inner}
        </div>
      </Popover>
    </div>
  )
}
