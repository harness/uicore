/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StepStatus, neutralStepStatusList } from './Step.constants'
import type { GetTitleStatusProps, StepStatusType } from './Step.types'

export const getStepStatus = (value: boolean): StepStatusType => (value ? StepStatus.SUCCESS : StepStatus.ERROR)

export const getTitleStatus = ({
  runValidationOnMount,
  stepId,
  isCurrentStep,
  isStepValid,
  currentStepStatus,
  isDisabled
}: GetTitleStatusProps): StepStatusType => {
  if (isDisabled) {
    return StepStatus.DISABLED
  }
  return runValidationOnMount
    ? getStepStatus(!!isStepValid?.(stepId))
    : isCurrentStep && !neutralStepStatusList.includes(currentStepStatus as StepStatus)
    ? getStepStatus(!!isStepValid?.(stepId))
    : currentStepStatus
}
