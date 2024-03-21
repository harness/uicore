/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IconName } from '@harnessio/icons'
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

export const DisabledState = {
  cursor: 'not-allowed',
  icon: 'ring' as IconName,
  iconColor: 'grey9',
  labelColor: Color.GREY_300
}
