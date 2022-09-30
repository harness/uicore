/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { IconName } from '@harness/icons'

export enum MultiTypeInputType {
  FIXED = 'FIXED',
  RUNTIME = 'RUNTIME',
  EXECUTION_TIME = 'EXECUTION_TIME',
  EXPRESSION = 'EXPRESSION'
}

export enum MultiTypeInputValue {
  STRING = 'STRING',
  SELECT_OPTION = 'SELECT_OPTION',
  MULTI_SELECT_OPTION = 'MULTI_SELECT_OPTION'
}

export const MultiTypeIcon: Record<MultiTypeInputType, IconName> = {
  FIXED: 'fixed-input',
  RUNTIME: 'runtime-input',
  EXECUTION_TIME: 'runtime-input',
  EXPRESSION: 'expression-input'
}

export const MultiTypeIconSize: Record<MultiTypeInputType, number> = {
  FIXED: 12,
  RUNTIME: 12,
  EXECUTION_TIME: 12,
  EXPRESSION: 16
}

export const RUNTIME_INPUT_VALUE = '<+input>'
export const EXECUTION_TIME_INPUT_VALUE = '<+input>.executionInput()'
export const EXPRESSION_INPUT_PLACEHOLDER = '<+expression>'
