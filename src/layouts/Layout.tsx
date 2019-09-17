import React from 'react'
import css from './Layout.css'

interface Props {
  spacing?: 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50
  children: React.ReactNode
}

function Vertical({ spacing = 20, children }: Props) {
  return (
    <div className={css.vertical} style={{ '--spacing': `${spacing}px` } as React.CSSProperties}>
      {children}
    </div>
  )
}

function Horizontal({ spacing = 20, children }: Props) {
  return (
    <div className={css.horizontal} style={{ '--spacing': `${spacing}px` } as React.CSSProperties}>
      {children}
    </div>
  )
}

export default {
  Vertical,
  Horizontal
}
