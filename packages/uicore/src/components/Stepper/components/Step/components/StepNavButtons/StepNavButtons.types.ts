/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface StepNavButtonsInterface {
  index: number
  isLastStep: boolean
  onContinue: (index: number, skipValidation?: boolean) => void
  nextButtonTitle?: string
  disableNext?: () => boolean
  isNextStepDisabled?: boolean
  isPreviousStepDisabled?: boolean
}
