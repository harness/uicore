import { HTMLDivProps } from '@blueprintjs/core'
import React from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
import { getInitialsFromNameOrEmail, getSumOfAllCharacters } from './utils'
const defaultColors = ['#eb2f06', '#e58e26', '#1e3799', '#78e08f', '#079992', '#ff6b81', '#a4b0be']

export interface AvatarProps extends HTMLDivProps {
  name?: string
  src?: string
  backgroundColor?: string | string[]
  email?: string
  size?: number
  borderRadius?: number
  color?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  fontSize?: number
}

export const Avatar = (props: AvatarProps) => {
  const {
    borderRadius = 100,
    src,
    name = '',
    backgroundColor = defaultColors,
    size = `36`,
    style,
    className,
    email = '',
    color = 'var(--white)',
    onClick,
    fontSize,
    ...rest
  } = props

  const formatedSize = `${size}px`

  let inner
  let initials = ''
  if (!src) {
    initials = getInitialsFromNameOrEmail(name, email)
  }
  // sum of characters will be used to decide the background color for that avatar
  let sumOfCharacters = Math.abs(getSumOfAllCharacters(initials))
  let calucatedBackgroundColor = Array.isArray(backgroundColor)
    ? backgroundColor[sumOfCharacters % backgroundColor.length]
    : backgroundColor

  const contentStyle = {
    borderRadius: `${borderRadius}%`,
    lineHeight: formatedSize,
    width: formatedSize,
    height: formatedSize,
    ...(!src && {
      backgroundColor: calucatedBackgroundColor,
      color
    }),
    ...(fontSize && { fontSize: `${fontSize}px` })
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
    <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick} {...rest}>
      <div className={css.AvatarInner} style={contentStyle}>
        {inner}
      </div>
    </div>
  )
}
