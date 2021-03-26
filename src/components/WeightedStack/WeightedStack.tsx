import React from 'react'
import cx from 'classnames'

import { Container } from '../Container/Container'
import { Color } from '../../core/Color'
import { Utils } from '../../core/Utils'
import { Text } from '../Text/Text'

import css from './WeightedStack.css'

export interface WeightedStackData {
  label: string
  value: number
  color?: Color
}
export interface WeightedStackProps {
  data: WeightedStackData[]
  className?: string
}

export const WeightedStack: React.FC<WeightedStackProps> = ({ data = [], className }) => {
  const sortedData = data.sort((point1: WeightedStackData, point2: WeightedStackData) =>
    point1.value > point2.value ? -1 : point2.value > point1.value ? 1 : 0
  )
  const max = Math.max(...sortedData.map((data: WeightedStackData) => data.value))
  return (
    <Container className={css.main}>
      {data.length ? (
        <div className={css.container}>
          {sortedData.map((item, index) => {
            const { label, value, color = Color.BLUE_450 } = item
            const percent = (value / max) * 100
            const realColor = Utils.getRealCSSColor(color)
            return (
              <div className={css.stack} key={index}>
                <Text className={css.stackLabel}>
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
