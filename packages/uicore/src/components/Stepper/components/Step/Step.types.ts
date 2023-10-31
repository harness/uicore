/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
}
