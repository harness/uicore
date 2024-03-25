/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StepStatusType } from '../../Step.types'
import { StepDetailsInterface } from '../../../../Stepper.types'

export interface StepTitleInterface {
  step: StepDetailsInterface
  index: number
  isCurrent: boolean
  stepStatus: StepStatusType
  onClick: (index: number) => void
  isOptional?: boolean
  hideTitle?: boolean
}
