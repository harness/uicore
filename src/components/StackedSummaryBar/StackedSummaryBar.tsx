/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './StackedSummaryBar.css'
import { Container } from '../Container/Container'
import { Color, Intent } from '@harness/design-system'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { handleZeroOrInfinityTrend, renderTrend } from './utils'
import { Position } from '@blueprintjs/core'
import { numberFormatter } from '../../utils/numberFormatter'

export interface StackedBarSectionData {
  count: number
  color: string
}

export interface BarSection {
  width: number
  color: string
}

export interface StackedSummaryBarData {
  barSectionsData: StackedBarSectionData[]
  trend?: string
  intent?: Intent
  showTrend?: boolean
}

export interface StackedSummaryBarProps extends StackedSummaryBarData {
  maxCount: number
  barLength?: number
}

export const getStackedSummaryBarCount = (barData: StackedBarSectionData[]): number =>
  barData.reduce((sum: number, section: StackedBarSectionData) => sum + section.count, 0)

export const StackedSummaryBar: React.FC<StackedSummaryBarProps> = props => {
  const { maxCount, barSectionsData, trend, intent = Intent.SUCCESS, barLength = 100, showTrend = true } = props
  const summaryCount = getStackedSummaryBarCount(barSectionsData)
  const trendChange = trend ? parseInt(trend) : 0
  const barSections: BarSection[] = []
  const effectiveBarLength = barLength - barSectionsData.length // for 1px gaps

  // Can not have stackBar without these data
  if (!(maxCount > 0) || !barSectionsData.length) {
    return null
  }

  barSectionsData.forEach((stackedBarSection: StackedBarSectionData) => {
    stackedBarSection.count && // section for 0 count is not required
      barSections.push({
        width: (stackedBarSection.count / maxCount) * effectiveBarLength,
        color: stackedBarSection.color
      })
  })
  // leftover section relative to maxCount should be as blank
  barSections.push({ width: (1 - summaryCount / maxCount) * effectiveBarLength, color: Color.GREY_100 })

  const formattedSummaryCount = React.useMemo(() => {
    return numberFormatter(summaryCount)
  }, [summaryCount])

  return (
    <Layout.Horizontal spacing="small">
      <Text
        font="small"
        className={css.summaryCount}
        lineClamp={1}
        tooltip={<Text padding={'small'}>{summaryCount}</Text>}
        alwaysShowTooltip={true}
        tooltipProps={{
          position: Position.TOP_RIGHT
        }}>
        {formattedSummaryCount}
      </Text>
      <Container flex>
        {barSections.map((barSection: BarSection, index: number) => {
          return barSection.width ? (
            <Container
              background={barSection.color}
              key={index}
              className={css.barSection}
              width={barSection.width}></Container>
          ) : null
        })}
      </Container>
      {showTrend ? (
        trendChange ? (
          <Container flex>
            {(intent === Intent.SUCCESS) === trendChange < 0
              ? renderTrend(trend, Color.RED_500)
              : renderTrend(trend, Color.GREEN_500)}
          </Container>
        ) : (
          handleZeroOrInfinityTrend(trend, intent === Intent.SUCCESS ? Color.GREEN_500 : Color.RED_500)
        )
      ) : (
        <></>
      )}
    </Layout.Horizontal>
  )
}
