/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '@harness/design-system'
import { styledClass } from '@harness/design-system'

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
