/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo } from 'react'
import { Container } from '../Container/Container'
import { Text } from '../Text/Text'
import { Color } from '@harnessio/design-system'
import { MarginProps } from '@harnessio/design-system'

const TOP_LABEL_MARGIN: MarginProps = { bottom: 'small' }
const BOTTOM_LABEL_MARGIN: MarginProps = { bottom: 'small' }

export interface StatusBarProps {
  gradient?: string
  background?: Color
  label?: string
  height: number
  width: number
}

export function StatusBar(props: StatusBarProps) {
  const { gradient, background, height, width, label } = props
  const statusBarColor = useMemo(() => (gradient ? { backgroundImage: gradient } : undefined), [gradient])
  return height > width ? (
    <Container data-name="verticalBar">
      <Container background={background} height={height} width={width} style={statusBarColor} />
      {label && <Text margin={BOTTOM_LABEL_MARGIN}>{label}</Text>}
    </Container>
  ) : (
    <Container data-name="horizontalBar">
      {label && <Text margin={TOP_LABEL_MARGIN}>{label}</Text>}
      <Container background={background} height={height} width={width} style={statusBarColor} />
    </Container>
  )
}
