import React, { useMemo } from 'react'
import { Container } from '../Container/Container'
import { Text } from '../Text/Text'
import { Color } from '../../core/Color'
import { MarginProps } from 'styled-props/margin/MarginProps'

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
