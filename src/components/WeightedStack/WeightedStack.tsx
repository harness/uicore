import React from 'react'
import cx from 'classnames'

import { Container } from '../Container/Container'
import { Color } from '../../core/Color'
import { Utils } from '../../core/Utils'

import css from './WeightedStack.css'

export interface WeightedStackData {
  label: string
  value: number
  color?: Color
}
export interface WeightedStackProps {
  data: WeightedStackData[]
  color?: Color
  className?: string
}

export const WeightedStack: React.FC<WeightedStackProps> = ({ data, color = Color.BLUE_450, className }) => {
  const max = Math.max(...data?.map((data: WeightedStackData) => data.value))
  const bgColor = Utils.getRealCSSColor(color)
  return (
    <Container role="spark-chart" className={css.main}>
      {data.length ? (
        <div className="container horizontal rounded">
          {data.map((item, index) => {
            const percent = (item.value / max) * 100
            return (
              <div role="spark" className={cx(`progress-bar`, className)} key={index}>
                <div className={`progress-track`}>
                  <div
                    className={`progress-fill`}
                    style={{ backgroundColor: bgColor, width: `${percent ? `${percent}%` : 0}` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </Container>
  )
}
