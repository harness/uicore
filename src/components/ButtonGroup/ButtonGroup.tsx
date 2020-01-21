import React from 'react'
import { Container } from '../Container/Container'
import css from './ButtonGroup.css'

export const ButtonGroup: React.FC<{}> = ({ children }) => {
  return <Container className={css.btnGroup}>{children}</Container>
}
