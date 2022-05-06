/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { StyledProps } from '@harness/design-system'
import { styledClasses } from '@harness/design-system'
import React, { HTMLAttributes } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, StyledProps {}

const Container: React.FC<ContainerProps> = props => {
  const { children } = props

  return (
    // @ts-ignore
    <div className={styledClasses(props)} {...props}>
      {children}
    </div>
  )
}

export default Container
