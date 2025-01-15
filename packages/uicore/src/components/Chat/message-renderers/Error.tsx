import React from 'react'
import { Text } from '../../../index'
import { FontVariation, Color } from '@harness/design-system'

interface ErrorProps {
  content: string
}
export default function Error({ content }: ErrorProps) {
  return (
    <Text font={{ variation: FontVariation.SMALL }} color={Color.RED_450}>
      {content}
    </Text>
  )
}
