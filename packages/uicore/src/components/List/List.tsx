/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import css from './List.css'

interface Props extends React.HTMLProps<HTMLElement> {
  /** If true, render List as an ordered list, default is false */
  ordered?: boolean

  /** List children */
  children?: React.ReactNode
}

function List(props: Props) {
  const { ordered, children } = props
  const Tag = (ordered ? 'ol' : 'ul') as React.ElementType

  return <Tag className={css.list}>{children}</Tag>
}

export { List }
