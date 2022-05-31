/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Button, ButtonProps } from 'components/Button/Button'
import React, { MouseEvent } from 'react'

type SplitButtonProps = Omit<ButtonProps, 'rightIcon'>

export const SplitButton: React.FC<SplitButtonProps> = props => {
  const { onClick, ...rest } = props

  const handleClick = async (event: MouseEvent) => {
    onClick?.(event)
  }

  return <Button rightIcon="chevron-down" {...rest} onClick={handleClick} />
}
