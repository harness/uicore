/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { IconName } from '@harnessio/icons'

export enum MultiTypeInputType {
  FIXED = 'FIXED',
  RUNTIME = 'RUNTIME',
  RUNTIMEV1 = 'RUNTIMEV1',
  EXECUTION_TIME = 'EXECUTION_TIME',
  EXPRESSION = 'EXPRESSION',
  REGEX = 'REGEX'
}

export enum MultiTypeInputValue {
  STRING = 'STRING',
  SELECT_OPTION = 'SELECT_OPTION',
  MULTI_SELECT_OPTION = 'MULTI_SELECT_OPTION'
}

export const MultiTypeIcon: Record<MultiTypeInputType, IconName> = {
  FIXED: 'fixed-input',
  RUNTIME: 'runtime-input',
  RUNTIMEV1: 'runtime-input',
  EXECUTION_TIME: 'runtime-input',
  EXPRESSION: 'expression-input',
  REGEX: 'reg-ex'
}

export const MultiTypeIconSize: Record<MultiTypeInputType, number> = {
  FIXED: 12,
  RUNTIME: 12,
  RUNTIMEV1: 12,
  EXECUTION_TIME: 12,
  EXPRESSION: 16,
  REGEX: 16
}

export const RUNTIME_INPUT_VALUE = '<+input>'
export const RUNTIME_INPUT_V1_PREFIX = '<+inputs.'
export const EXECUTION_TIME_INPUT_VALUE = '<+input>.executionInput()'
export const EXPRESSION_INPUT_PLACEHOLDER = '<+expression>'
export const REGEX_INPUT_PLACEHOLDER = '^match$'
