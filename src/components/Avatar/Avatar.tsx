import { HTMLDivProps } from '@blueprintjs/core'
import React from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
import { getInitialsFromNameOrEmail, getSumOfAllCharacters, defaultAvatarColor } from './utils'
import { FontSize } from 'styled-props/font/FontProps'
import { Utils } from '../../core/Utils'
import { Icon } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Container } from '../../components/Container/Container'

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
}
interface SizeValueProps {
  size: string
  fontSize: string
}
type SizesProps = {
  [key in AvatarSizes]: SizeValueProps
}
const sizes: SizesProps = {
  xsmall: { size: '16px', fontSize: '7px' },
  small: { size: '24px', fontSize: '10px' },
  normal: { size: '32px', fontSize: '10px' },
  medium: { size: '48px', fontSize: '18px' },
  large: { size: '72px', fontSize: '28px' }
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

    ...rest
  } = props
  let textColor = color
  const formatedSize = sizes[size].size
  const fontSize = sizes[size].fontSize
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
    lineHeight: formatedSize,
    width: formatedSize,
    height: formatedSize,
    ...(!src && {
      backgroundColor: Utils.getRealCSSColor(calucatedBackgroundColor || 'BLUE_800'),
      color: Utils.getRealCSSColor(textColor)
    }),
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
    lineHeight: sizes.medium.size
  }
  const tooltip = (
    <Container className={css.hoverContainer}>
      <Container className={css.hoverNameContainer}>
        <Container className={classnames(css.AvatarInner, css.hoverAvatarIcon)} style={toolTipStyle}>
          {src ? <img src={src} style={toolTipStyle} className={css.imageStyle} alt={name} /> : inner}
        </Container>

        {name && <span className={css.hoverNameDiv}>{name}</span>}
      </Container>
      <Container className={css.hoverEmailContainer}>
        {email && (
          <Container className={css.hoverEmailDiv}>
            <Icon color="grey300" size={12} name="command-email"></Icon>
            <span>{email}</span>
          </Container>
        )}
      </Container>
    </Container>
  )
  return (
    <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick} {...rest}>
      {hoverCard ? (
        <Utils.WrapOptionalTooltip tooltip={tooltip}>
          <div className={css.AvatarInner} style={contentStyle}>
            {inner}
          </div>
        </Utils.WrapOptionalTooltip>
      ) : (
        <div className={css.AvatarInner} style={contentStyle}>
          {inner}
        </div>
      )}
    </div>
  )
}
