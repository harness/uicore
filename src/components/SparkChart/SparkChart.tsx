import React from 'react'
import css from './SparkChart.css';
import { Container } from '../Container/Container'


export interface SparkChartProps {
  data: number[]
}

export const SparkChart: React.FC<SparkChartProps> = ({
  data
}) => {

  const max = Math.max(...data)

  return (
    <Container className={css.main}>
      <div className="container vertical rounded">
        {data.map((item, index) => {
          const percent = (item / max) * 100;
          return (
            <div className={`progress-bar`} key={index}>
              <div className={`progress-track`}>
                <div className={`progress-fill`} style={{ height: `${percent}%` }}></div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
