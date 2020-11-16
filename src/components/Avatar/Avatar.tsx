import { HTMLDivProps } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import css from './Avatar.css'
import classnames from 'classnames'
const defaultColors = ['#eb2f06', '#e58e26', '#1e3799', '#78e08f', '#079992', '#ff6b81', '#a4b0be']

export interface AvatarProps extends HTMLDivProps {
  name?: string
  src?: string
  colors?: string | string[]
  email?: string
  size?: number
  borderRadius?: number
  textColor?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Avatar = (props: AvatarProps) => {
  const {
    borderRadius = 100,
    src,
    name = '',
    color,
    colors = defaultColors,
    size = `36`,
    style,
    className,
    email = '',
    textColor = 'white',
    onClick
  } = props

  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    if (color) {
      setBackgroundColor(color)
    } else {
      const i = Math.floor(Math.random() * 10) % colors.length
      setBackgroundColor(colors[i])
    }
  }, [])

  let initialsFromName = name
    .split(/-| /)
    .map((n: string) => n[0])
    .join('')

  initialsFromName =
    initialsFromName.length > 2
      ? `${initialsFromName[0]}${initialsFromName[initialsFromName.length - 1]}`
      : initialsFromName
  let initialsFromEmail = email.split('@')[0]
  const splitedInitialsFromEmail = initialsFromEmail.split('.')
  initialsFromEmail =
    splitedInitialsFromEmail.length > 1
      ? `${splitedInitialsFromEmail[0][0]}${splitedInitialsFromEmail[splitedInitialsFromEmail.length - 1][0]}`
      : initialsFromEmail[0]

  const formatedSize = String(size) + 'px'

  const imageStyle: React.CSSProperties = {
    display: 'block',
    borderRadius: `${borderRadius}%`
  }

  const contentStyle: React.CSSProperties = {
    lineHeight: formatedSize,
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: `${borderRadius}%`
  }

  if (formatedSize) {
    imageStyle.width = contentStyle.width = contentStyle.maxWidth = formatedSize
    imageStyle.height = contentStyle.height = contentStyle.maxHeight = formatedSize
  }

  let inner
  if (src) {
    inner = <img style={imageStyle} src={src} alt={name} />
  } else {
    contentStyle.backgroundColor = backgroundColor
    contentStyle.color = textColor
    inner = initialsFromName || initialsFromEmail || 'X'
    inner = inner.toUpperCase()
  }

  return (
    <div className={classnames(className, css.Avatar)} style={style} onClick={onClick}>
      <div className={css.AvatarInner} style={contentStyle}>
        {inner}
      </div>
    </div>
  )
}
