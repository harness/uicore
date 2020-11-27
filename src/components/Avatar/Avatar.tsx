import { HTMLDivProps } from '@blueprintjs/core'
import React from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
import { getInitialsFromNameOrEmail, getSumOfAllCharacters } from './utils'
import { FontSize } from 'styled-props/font/FontProps'
import { Color } from '../../core/Color'
import { Utils } from '../../core/Utils'
const defaultColors = Object.values(Color)
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
  normal: { size: '28px', fontSize: '10px' },
  medium: { size: '48px', fontSize: '18px' },
  large: { size: '96px', fontSize: '36px' }
}

export const Avatar = (props: AvatarProps) => {
  const {
    borderRadius = 100,
    src,
    name = '',
    backgroundColor = defaultColors,
    size = 'normal',
    style,
    className,
    email = '',
    color = Color.WHITE,
    onClick,
    ...rest
  } = props
  const formatedSize = sizes[size].size
  const fontSize = sizes[size].fontSize
  let inner
  let initials = ''
  if (!src) {
    initials = getInitialsFromNameOrEmail(name, email)
  }
  // sum of characters will be used to decide the background color for that avatar
  const sumOfCharacters = Math.abs(getSumOfAllCharacters(initials))
  const calucatedBackgroundColor = Array.isArray(backgroundColor)
    ? backgroundColor[sumOfCharacters % backgroundColor.length]
    : backgroundColor
  const contentStyle = {
    borderRadius: `${borderRadius}%`,
    lineHeight: formatedSize,
    width: formatedSize,
    height: formatedSize,
    ...(!src && {
      backgroundColor: Utils.getRealCSSColor(calucatedBackgroundColor),
      color: Utils.getRealCSSColor(color)
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

  return (
    <>
      <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick} {...rest}>
        <div className={css.AvatarInner} style={contentStyle}>
          {inner}
        </div>
      </div>
    </>
  )
}
