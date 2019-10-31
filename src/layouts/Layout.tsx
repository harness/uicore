import React, { HTMLAttributes } from 'react'
import { Overwrite } from 'utility-types'
import { StyledProps, styledClasses, omitStyledProps } from '../styled-props/StyledProps'
import css from './Layout.css'
import { Spacing } from 'core/Spacing'

interface Props extends Overwrite<HTMLAttributes<HTMLDivElement>, StyledProps> {
  /** Spacing among children */
  spacing?: Spacing
}

function Vertical(props: Props) {
  return (
    <div
      {...omitStyledProps(props)}
      className={styledClasses(props, css.vertical, css[`layout-spacing-${props.spacing}`])}>
      {props.children}
    </div>
  )
}

function Horizontal(props: Props) {
  return (
    <div
      {...omitStyledProps(props)}
      className={styledClasses(props, css.horizontal, css[`layout-spacing-${props.spacing}`])}>
      {props.children}
    </div>
  )
}

const Layout = { Vertical, Horizontal }

export { Layout }
