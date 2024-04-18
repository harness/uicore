/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ElementType, HTMLAttributes } from 'react'
import { Classes } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '@harness/design-system'

export interface HarnessIconProps extends HTMLAttributes<HTMLHeadingElement>, Omit<StyledProps, 'children'> {
  size?: number
}

export default function withHarnessIcon(Component: ElementType, name: string) {
  return (props: HarnessIconProps): React.ReactElement => {
    const { size } = props
    return (
      <span {...omitStyledProps(props, 'size')} data-icon={name} className={styledClasses(props, Classes.ICON)}>
        <Component width={size} height={size} />
      </span>
    )
  }
}
