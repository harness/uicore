/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IconName } from '@harnessio/icons'
import { StepStatus } from '../../Step.constants'
import type { StepStatusType } from '../../Step.types'
import { DefaultState, SuccessState, ErrorState, DisabledState } from './StepTitle.constants'

export const getStateByStatus = (
  stepStatus: StepStatusType
): {
  icon: IconName
  cursor: string
  iconColor: string
  labelColor: string
} => {
  switch (stepStatus) {
    case StepStatus.ERROR:
      return {
        icon: ErrorState.icon as IconName,
        cursor: ErrorState.cursor,
        iconColor: ErrorState.iconColor,
        labelColor: ErrorState.labelColor
      }
    case StepStatus.SUCCESS:
      return {
        icon: SuccessState.icon as IconName,
        cursor: SuccessState.cursor,
        iconColor: SuccessState.iconColor,
        labelColor: SuccessState.labelColor
      }
    case StepStatus.DISABLED:
      return {
        icon: DisabledState.icon,
        cursor: DisabledState.cursor,
        iconColor: DisabledState.iconColor,
        labelColor: DisabledState.labelColor
      }
    case StepStatus.INCONCLUSIVE:
    default:
      return {
        icon: DefaultState.icon,
        cursor: DefaultState.cursor,
        iconColor: DefaultState.iconColor,
        labelColor: DefaultState.labelColor
      }
  }
}
