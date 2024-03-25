/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface StepDetailsInterface {
  id: string
  title: string
  subTitle?: string
  panel: React.ReactElement
  preview?: React.ReactElement
  isOptional?: boolean
  errorMessage?: string[]
  nextButtonTitle?: string
  disableNext?: () => boolean
  disabled?: boolean
}

export interface StepperProps {
  id: string
  stepList: StepDetailsInterface[]
  onStepChange?: (id: string) => void
  isStepValid?: (selectedTabId: string) => boolean
  runValidationOnMount?: boolean
  hideTitleWhenActive?: boolean
  activeStepId?: string
}
