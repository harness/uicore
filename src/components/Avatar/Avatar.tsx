import { HTMLDivProps } from '@blueprintjs/core'
import React from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
import { getInitialsFromNameOrEmail } from './utils'
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
    onClick
  } = props

  const formatedSize = `${size}px`

  let inner
  const contentStyle = {
    borderRadius: `${borderRadius}%`,
    lineHeight: formatedSize,
    width: formatedSize,
    height: formatedSize,
    ...(!src && {
      backgroundColor: Array.isArray(backgroundColor)
        ? backgroundColor[Math.floor(Math.random() * 10) % backgroundColor.length]
        : backgroundColor,
      color
    })
  }
  if (src) {
    inner = <img src={src} style={contentStyle} className={css.imageStyle} alt={name} />
  } else {
    const initials = getInitialsFromNameOrEmail(name, email)
    if (!initials) {
      return <></>
    }
    inner = initials
    inner = inner.toUpperCase()
  }

  return (
    <div className={classnames(className, css.Avatar, css.contentStyle)} style={style} onClick={onClick}>
      <div className={css.AvatarInner} style={contentStyle}>
        {inner}
      </div>
    </div>
  )
}
