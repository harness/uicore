/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { FormEvent } from 'react'
import css from './SparkChart.css'
import cx from 'classnames'
import { Container, ContainerProps } from '../Container/Container'
import { Color } from '@harness/design-system'
import { Utils } from '../../core/Utils'
import { isEmpty } from 'lodash-es'

export interface SparkChartProps extends ContainerProps {
  /** numerical data array to pass */
  data: number[]

  /** numerical data array to pass for second */
  data2?: number[]

  /** className to be appended to default className */
  className?: string

  /** onClick Event */
  onClick?: (event: FormEvent<HTMLElement>) => void

  /** custom fill color */
  color?: Color

  /** custom fill color */
  color2?: Color

  /** empty record height */
  emptyHeight?: React.CSSProperties['height']
}

export const SparkChart: React.FC<SparkChartProps> = ({
  data,
  data2 = [],
  emptyHeight = `2px`,
  className = '',
  onClick = () => void 0,
  color = Color.BLUE_450,
  color2 = Color.RED_450,
  ...rest
}) => {
  const bgColor = Utils.getRealCSSColor(color)
  const bgColor2 = Utils.getRealCSSColor(color2)
  const combinedArray = data2.length === data.length ? data.map((item, index) => item + data2[index] || 0) : data
  const max = Math.max(...combinedArray)
  return (
    <Container role="spark-chart" className={css.main} onClick={onClick} {...rest}>
      {isEmpty(data2) && data2.length !== data.length ? (
        <div className="container vertical rounded">
          {data.map((item, index) => {
            const percent = (item / max) * 100
            return (
              <div role="spark" className={cx(`progress-bar`, className)} key={index}>
                <div className={`progress-track`}>
                  <div
                    className={`progress-fill`}
                    style={{ backgroundColor: bgColor, height: `${percent ? `${percent}%` : emptyHeight}` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="container vertical rounded">
          {data.map((item, index) => {
            const percent = (item / max) * 100
            const percent2 = (data2[index] / max) * 100
            return (
              <div role="spark" className={cx(`progress-bar`, className)} key={index}>
                <div className={`progress-track`}>
                  <div
                    className={`progress-fill`}
                    style={{ backgroundColor: bgColor, height: `${percent ? `${percent}%` : emptyHeight}` }}></div>
                  <div
                    className={`progress-fill`}
                    style={{
                      backgroundColor: bgColor2,
                      height: `${percent2}%`,
                      bottom: `${percent ? `${percent}%` : emptyHeight}`
                    }}></div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Container>
  )
}
