import React from 'react'
import css from './ListItem.css'

interface Props extends React.HTMLProps<HTMLElement> {
  /** List Item children */
  children?: React.ReactNode
}

function ListItem(props: Props) {
  return <li className={css.item}>{props.children}</li>
}

export { ListItem }
