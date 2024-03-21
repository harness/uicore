/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '@harnessio/design-system'
import { styledClass } from '@harnessio/design-system'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, StyledProps {
  tag?: keyof JSX.IntrinsicElements
}

const Container = React.forwardRef(function Container(props: ContainerProps, ref) {
  const { tag = 'div', children } = props
  const Tag = tag as React.ElementType

  return (
    <Tag {...omitStyledProps(props, 'ref')} className={styledClasses(props, styledClass.font)} ref={ref}>
      {children}
    </Tag>
  )
})

Container.displayName = 'Container'

export { Container }
