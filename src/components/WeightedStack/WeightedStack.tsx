import React, { useMemo } from 'react'
import cx from 'classnames'

import { Container } from '../Container/Container'
import { Color } from '../../core/Color'
import { Utils } from '../../core/Utils'
import { Text } from '../Text/Text'

import css from './WeightedStack.css'

export enum LabelPosition {
  LEFT = 'LabelPosition.LEFT',
  RIGHT = 'LabelPosition.RIGHT',
  TOP = 'LabelPosition.TOP',
  BOTTOM = 'LabelPosition.BOTTOM'
}
export interface WeightedStackData {
  label: string
  value: number
  color?: Color
}
export interface WeightedStackPropsCommon {
  data: WeightedStackData[]
  className?: string
}

interface InlineLabelPosition extends WeightedStackPropsCommon {
  labelPosition: LabelPosition.LEFT | LabelPosition.RIGHT
  labelWidth: string
}

interface NonInlineLabelPosition extends WeightedStackPropsCommon {
  labelPosition?: LabelPosition.TOP | LabelPosition.BOTTOM
}

export type WeightedStackProps = InlineLabelPosition | NonInlineLabelPosition

export const WeightedStack: React.FC<WeightedStackProps> = props => {
  const { data = [], className, labelPosition = LabelPosition.TOP } = props
  const labelWidth = (props as InlineLabelPosition).labelWidth
  const sortedData = useMemo(
    () =>
      data.sort((point1: WeightedStackData, point2: WeightedStackData) =>
        point1.value > point2.value ? -1 : point2.value > point1.value ? 1 : 0
      ),
    [data]
  )
  const maxValue = sortedData[0].value
  const stackLabelWidthStyle =
    labelPosition === LabelPosition.LEFT || labelPosition === LabelPosition.RIGHT
      ? {
          style: {
            width: labelWidth
          }
        }
      : {}

  return (
    <Container className={css.main}>
      {data.length ? (
        <div className={css.container}>
          {sortedData.map((item, index) => {
            const { label, value, color = Color.BLUE_450 } = item
            const percent = (value / maxValue) * 100
            const realColor = Utils.getRealCSSColor(color)
            return (
              <div
                className={cx(css.stack, {
                  [css.stackRow]: labelPosition === LabelPosition.LEFT,
                  [css.stackRowReverse]: labelPosition === LabelPosition.RIGHT,
                  [css.stackColumn]: labelPosition === LabelPosition.TOP,
                  [css.stackColumnReverse]: labelPosition === LabelPosition.BOTTOM
                })}
                key={index}>
                <Text className={css.stackLabel} {...stackLabelWidthStyle}>
                  {label}&nbsp;({value})
                </Text>
                <div className={cx('progress-bar', className)}>
                  <div className={'progress-track'}>
                    <div
                      className={'progress-fill'}
                      style={{
                        backgroundColor: realColor,
                        width: `${percent ? `${percent}%` : 0}`
                      }}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </Container>
  )
}
