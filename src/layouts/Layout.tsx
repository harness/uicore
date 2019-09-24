import React from 'react'
import { StyledProps, classFromProps } from '../core/StyledProps'
import css from './Layout.css'

interface Props extends Pick<StyledProps, 'spacing'> {
  children: React.ReactNode
}

function Vertical(props: Props) {
  return <div className={classFromProps(props, css.vertical)}>{props.children}</div>
}

function Horizontal(props: Props) {
  return <div className={classFromProps(props, css.horizontal)}>{props.children}</div>
}

export default {
  Vertical,
  Horizontal
}
