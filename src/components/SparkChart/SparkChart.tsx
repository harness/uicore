import React, { FormEvent } from 'react'
import css from './SparkChart.css'
import cx from 'classnames'
import { Container } from '../Container/Container'
import { Color } from '../../core/Color'
import { Utils } from '../../core/Utils'


export interface SparkChartProps {

  /** numerical data array to pass */
  data: number[]

  /** className to be appended to default className */
  className?: string

  /** onClick Event */
  onClick?: (event: FormEvent<HTMLElement>) => void

  /** custom fill color */
  color?: Color
}

export const SparkChart: React.FC<SparkChartProps> = ({
  data,
  className = '',
  onClick = () => { },
  color = Color.BLUE_450
}) => {

  const max = Math.max(...data)
  const bgColor = Utils.getRealCSSColor(color)
  return (
    <Container role='spark-chart' className={css.main} onClick={onClick}>
      <div className="container vertical rounded">
        {data.map((item, index) => {
          const percent = (item / max) * 100;
          return (
            <div role='spark' className={cx(`progress-bar`, className)} key={index} >
              <div className={`progress-track`}>
                <div className={`progress-fill`} style={{ backgroundColor: bgColor, height: `${percent}%` }}></div>
              </div>
            </div>
          )
        })}
      </div>
    </Container >
  )
}
