/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { AcceptableValue } from '../MultiTypeInput/MultiTypeInput'
import { createContext } from 'react'
import { IconProps } from '@harness/icons'

export interface IRenderProps {
  name: string
  value?: AcceptableValue
  onChange?: (value: string) => void
}

export interface ICustomExpressionInputContext {
  render: (props: IRenderProps) => JSX.Element
  popoverInfo: {
    label: string
    helperText: React.ReactNode
    iconProps: IconProps
  }
  isCustomExpression: (value?: string) => boolean
}

export const CustomExpressionInputContext = createContext<ICustomExpressionInputContext | null>(null)
