/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum StepStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INCONCLUSIVE = 'INCONCLUSIVE',
  DISABLED = 'DISABLED'
}

export const neutralStepStatusList = [StepStatus.INCONCLUSIVE, StepStatus.DISABLED]
