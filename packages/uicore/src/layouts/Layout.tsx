/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '@harnessio/design-system'
import css from './Layout.css'
import { Spacing } from '@harnessio/design-system'
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

Layout.Vertical.displayName = 'Layout.Vertical'
Layout.Horizontal.displayName = 'Layout.Horizontal'

export { Layout, MasonryRef, MasonryProps }
