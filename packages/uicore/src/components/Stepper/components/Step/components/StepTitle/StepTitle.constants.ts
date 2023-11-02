/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { IconName } from '@harness/icons'
import { Color } from '@harness/design-system'

export const SuccessState = {
  icon: 'tick-circle',
  cursor: 'pointer',
  iconColor: 'primary7',
  labelColor: Color.PRIMARY_7
}

export const ErrorState = {
  icon: 'warning-sign',
  cursor: 'not-allowed',
  iconColor: 'error',
  labelColor: Color.PRIMARY_10
}

export const DefaultState = {
  cursor: 'not-allowed',
  icon: 'ring' as IconName,
  iconColor: 'primary9',
  labelColor: Color.PRIMARY_10
}
