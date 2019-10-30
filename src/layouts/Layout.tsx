import React from 'react'
import { StyledProps, styledClasses } from '../styled-props/StyledProps'
import css from './Layout.css'
import { Spacing } from 'core/Spacing'

interface Props extends Pick<StyledProps, 'id' | 'children'> {
  spacing?: Spacing
}

function Vertical(props: Props) {
  return (
    <div id={props.id} className={styledClasses(props, css.vertical, css[`layout-spacing-${props.spacing}`])}>
      {props.children}
    </div>
  )
}

function Horizontal(props: Props) {
  return (
    <div id={props.id} className={styledClasses(props, css.horizontal, css[`layout-spacing-${props.spacing}`])}>
      {props.children}
    </div>
  )
}

const Layout = { Vertical, Horizontal }

export { Layout }
