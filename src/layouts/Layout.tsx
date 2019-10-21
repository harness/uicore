import React from 'react'
import { StyledProps, styledClasses } from '../styled-props/StyledProps'
import css from './Layout.css'

type Props = Pick<StyledProps, 'children' | 'margin'>

function Vertical(props: Props) {
  return <div className={styledClasses(props, css.vertical)}>{props.children}</div>
}

function Horizontal(props: Props) {
  return <div className={styledClasses(props, css.horizontal)}>{props.children}</div>
}

const Layout = { Vertical, Horizontal }

export { Layout }
