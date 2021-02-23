import type { IconName } from '../../icons/Icon'

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
