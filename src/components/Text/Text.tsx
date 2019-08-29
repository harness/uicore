import React from 'react'
import css from './Text.css'

interface Props {
  inline?: boolean
  children: React.ReactNode
}

export default function Text({ inline = true, children }: Props) {
  const Tag = `${inline ? 'span' : 'p'}` as React.ElementType
  return <Tag className={css.t}>{children}</Tag>
}

export function test() {
  return <Text>Hello World</Text>
}
