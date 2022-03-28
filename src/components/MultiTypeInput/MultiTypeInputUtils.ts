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
  EXPRESSION = 'EXPRESSION'
}

export enum MultiTypeInputValue {
  STRING = 'STRING',
  SELECT_OPTION = 'SELECT_OPTION',
  MULTI_SELECT_OPTION = 'MULTI_SELECT_OPTION'
}

export const MultiTypeIcon: Record<string, IconName> = {
  FIXED: 'fixed-input',
  RUNTIME: 'runtime-input',
  EXPRESSION: 'expression-input'
}

export const MultiTypeIconSize: Record<string, number> = {
  FIXED: 12,
  RUNTIME: 12,
  EXPRESSION: 16
}

export const RUNTIME_INPUT_VALUE = '<+input>'
export const EXPRESSION_INPUT_PLACEHOLDER = '<+expression>'
