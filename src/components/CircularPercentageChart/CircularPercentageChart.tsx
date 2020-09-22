import React, { useEffect } from 'react'
import { Color, Text, Utils } from '../..'
import { Easing, useTween } from '../../hooks/useTween'
import { FontSize, FontProps } from '../../styled-props/font/FontProps'

export interface CircularPercentageChartProps {
  size: number
  value: number
  label?: string | number
  trackColor?: Color
  color: Color
  font: FontSize | FontProps
}

export const CircularPercentageChart: React.FC<CircularPercentageChartProps> = ({
  size,
  value,
  label = value,
  trackColor = Color.GREY_300,
  color,
  font
}) => {
  const cssTrackColor = Utils.getRealCSSColor(trackColor)
  const cssPercentageColor = Utils.getRealCSSColor(color)
  const [_value, setValue] = useTween(0, { easing: Easing.easeInOutQuart, duration: 1500 })

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <div style={{ width: `${size}px`, height: `${size}px`, position: 'relative' }}>
      <svg viewBox="0 0 36 36">
        <path
          style={{ fill: 'none', stroke: cssTrackColor, strokeWidth: 1 }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          strokeDasharray={`${_value > 97 && _value < 100 ? 97 : _value}, 100`}
          strokeLinecap="round"
          style={{
            fill: 'none',
            stroke: cssPercentageColor,
            strokeWidth: value ? 2 : 0
          }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <Text
        color={color}
        font={font ? font : 'large'}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {label}
      </Text>
    </div>
  )
}
