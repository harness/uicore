/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { HTMLAttributes } from 'react'
import { StyledProps } from '../styled-props/StyledProps'

export interface IconBase extends HTMLAttributes<HTMLHeadingElement>, Omit<StyledProps, 'children'> {
  inverse?: boolean
  size?: number
}
