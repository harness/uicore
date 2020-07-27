import React, { useEffect, useState } from 'react'
import css from './Avatar.css'

const defaultColors = ['#eb2f06', '#e58e26', '#1e3799', '#78e08f', '#079992', '#ff6b81', '#a4b0be']

export interface AvatarProps {
  borderRadius?: number
  name?: string
  src?: string
  color?: string
  colors?: string[]
  size?: number
  style?: React.CSSProperties
  className?: string
  email?: string
}

export const Avatar = (props: AvatarProps) => {
  const {
    borderRadius = '100%',
    src,
    name = '',
    color,
    colors = defaultColors,
    size = 36,
    style,
    className,
    email = ''
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

  const initialsFromName = name
    .split(/-| /)
    .map((n: string) => n[0])
    .join('')
  const initialsFromEmail = email
    .split('.')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const formatedSize = String(size) + 'px'

  const imageStyle: React.CSSProperties = {
    display: 'block',
    borderRadius
  }

  const contentStyle: React.CSSProperties = {
    lineHeight: formatedSize,
    textAlign: 'center',
    borderRadius
  }

  if (formatedSize) {
    imageStyle.width = contentStyle.width = contentStyle.maxWidth = formatedSize
    imageStyle.height = contentStyle.height = contentStyle.maxHeight = formatedSize
  }

  let inner
  const classes = [className, css.Avatar]
  if (src) {
    inner = <img style={imageStyle} src={src} alt={name} />
  } else {
    contentStyle.backgroundColor = backgroundColor
    inner = initialsFromName || initialsFromEmail || 'X'
  }

  return (
    <div className={classes.join(' ')} style={style}>
      <div className={css.AvatarInner} style={contentStyle}>
        {inner}
      </div>
    </div>
  )
}
