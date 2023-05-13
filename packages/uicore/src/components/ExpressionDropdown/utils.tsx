/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { isEmpty } from 'lodash-es'

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
