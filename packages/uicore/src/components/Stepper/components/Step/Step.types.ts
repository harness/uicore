/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StepDetailsInterface } from '../../Stepper.types'
import type { StepStatus } from './Step.constants'

export interface StepPropsInterface {
  stepList: StepDetailsInterface[]
  selectedStepId?: string
  step: StepDetailsInterface
  index: number
  onStepChange?: (id: string) => void
  isStepValid?: (selectedTabId: string) => boolean
  runValidationOnMount?: boolean
  isOptional?: boolean
  setSelectedStepId: (id: string) => void
  hideTitleWhenActive?: boolean
}
export type StepStatusType = keyof typeof StepStatus

export interface GetTitleStatusProps {
  stepId: string
  runValidationOnMount: boolean
  isCurrentStep: boolean
  currentStepStatus: StepStatusType
  isStepValid?: (selectedTabId: string) => boolean
  isDisabled?: boolean
}
