/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useContext } from 'react'
import { CustomExpressionInputContext, IRenderProps } from './CustomExpressionInputContext'

function CustomExpressionInput(props: IRenderProps): JSX.Element {
  const ctx = useContext(CustomExpressionInputContext)
  return ctx ? ctx.render(props) : <></>
}

export default CustomExpressionInput
