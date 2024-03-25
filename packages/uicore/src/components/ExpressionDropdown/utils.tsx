/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IconName } from '@harnessio/icons'
import { isEmpty } from 'lodash-es'
import { TrieNode } from './ExpressionDropdown'

export function setOpenTargetElement(
  isOpen: boolean[],
  setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>,
  valueTillHere: string,
  targetValue: boolean
): void {
  const newIsOpen = [...isOpen]
  let targetElement = valueTillHere.split('.').length
  if (isEmpty(valueTillHere)) {
    targetElement = targetElement - 1
  }
  if (newIsOpen[targetElement] === targetValue) {
    newIsOpen[targetElement] = !targetValue
  } else {
    newIsOpen[targetElement] = targetValue
  }
  setIsOpen(newIsOpen)
}

export function getDropDownIcon(item: TrieNode, isOpen: boolean[]): IconName {
  let targetElement
  if (isEmpty(item.valueTillHere)) {
    targetElement = item.valueTillHere.split('.').length - 1
  } else {
    targetElement = item.valueTillHere.split('.').length
  }
  if (isOpen[targetElement]) {
    return 'main-chevron-down'
  }
  return 'main-chevron-right'
}
