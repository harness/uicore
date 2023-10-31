/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { IconName } from '@harness/icons'
import { StepStatus } from '../../Step.constants'
import type { StepStatusType } from '../../Step.types'
import { DefaultState, SuccessState, ErrorState } from './StepTitle.constants'

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
