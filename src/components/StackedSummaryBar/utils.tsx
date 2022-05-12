/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'

import { Color } from '@harness/design-system'
import { Container } from '../Container/Container'
import { Icon } from '@harness/icons'
import { Text } from '../Text/Text'

export const handleZeroOrInfinityTrend = (trend: string | undefined, intentColor: Color): JSX.Element => {
  const trendChange = trend ? parseInt(trend) : 0
  return isNaN(trendChange) ? ( // handling Infinity and other unexpected trends
    <Container flex={{ alignItems: 'center' }}>
      <Icon name={'caret-up'} color={intentColor}></Icon>
      <Text font="xsmall" color={intentColor}>
        N/A
      </Text>
    </Container>
  ) : (
    // handing 0 trend change
    <Container flex>{renderTrend(trend, Color.GREY_300)}</Container>
  )
}

export const renderTrend = (trend: string | undefined, intentColor: Color): JSX.Element => {
  const trendChange = trend ? parseInt(trend) : 0
  return (
    <>
      <Icon
        name={trendChange === 0 ? 'caret-right' : trendChange < 0 ? 'caret-down' : 'caret-up'}
        color={intentColor}></Icon>
      <Text font="xsmall" color={intentColor}>
        {Math.sign(trendChange) === -1 ? trend?.substring(1) : trend}
      </Text>
    </>
  )
}
