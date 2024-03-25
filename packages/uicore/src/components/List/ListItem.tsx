/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
