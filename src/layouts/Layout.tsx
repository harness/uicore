import React from 'react'
import { StyledProps, classFromStyledProps } from '../core/StyledProps'
import css from './Layout.css'

interface Props extends Pick<StyledProps, 'spacing'> {
  children: React.ReactNode
}

function Vertical(props: Props) {
  return <div className={classFromStyledProps(props, css.vertical)}>{props.children}</div>
}

function Horizontal(props: Props) {
  return <div className={classFromStyledProps(props, css.horizontal)}>{props.children}</div>
}

const Layout = { Vertical, Horizontal }

export { Layout }
