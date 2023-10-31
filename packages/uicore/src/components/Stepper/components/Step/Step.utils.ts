/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { StepStatus } from './Step.constants'
import type { GetTitleStatusProps, StepStatusType } from './Step.types'

export const getStepStatus = (value: boolean): StepStatusType => (value ? StepStatus.SUCCESS : StepStatus.ERROR)

export const getTitleStatus = ({
  runValidationOnMount,
  stepId,
  isCurrentStep,
  isStepValid,
  currentStepStatus
}: GetTitleStatusProps): StepStatusType =>
  runValidationOnMount
    ? getStepStatus(!!isStepValid?.(stepId))
    : isCurrentStep && currentStepStatus !== StepStatus.INCONCLUSIVE
    ? getStepStatus(!!isStepValid?.(stepId))
    : currentStepStatus
