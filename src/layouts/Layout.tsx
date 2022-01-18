/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '../styled-props/StyledProps'
import css from './Layout.css'
import { Spacing } from 'core/Spacing'
import { Masonry, MasonryRef, MasonryProps } from './Masonry'

export interface LayoutProps extends HTMLAttributes<HTMLDivElement>, StyledProps {
  /** Spacing among children */
  spacing?: Spacing
}

function Vertical(props: LayoutProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      {...omitStyledProps(props)}
      className={styledClasses(props, css.vertical, css[`layout-spacing-${props.spacing}`])}>
      {props.children}
    </div>
  )
}

function Horizontal(props: LayoutProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      {...omitStyledProps(props)}
      className={styledClasses(props, css.horizontal, css[`layout-spacing-${props.spacing}`])}>
      {props.children}
    </div>
  )
}

const Layout = { Vertical: React.forwardRef(Vertical), Horizontal: React.forwardRef(Horizontal), Masonry }

export { Layout, MasonryRef, MasonryProps }
