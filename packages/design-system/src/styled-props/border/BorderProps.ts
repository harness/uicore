/*
 * Copyright 2019 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Color } from '../../common/Color'

export interface BorderProps {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
  color?: Color

  /* TODO: Support border-width, border-style, border-radius, etc... */
  style?: string
  width?: number
  radius?: number
}
