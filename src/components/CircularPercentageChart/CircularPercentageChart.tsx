import React from 'react'
import { Color, Text, Utils } from '../..'

export interface CircularPercentageChartProps {
  size: number
  value: number
  label?: string | number
  trackColor?: Color
  color: Color
}

export const CircularPercentageChart: React.FC<CircularPercentageChartProps> = ({
  size,
  value,
  label = value,
  trackColor = Color.GREY_300,
  color
}) => {
  const cssTrackColor = Utils.getRealCSSColor(trackColor)
  const cssPercentageColor = Utils.getRealCSSColor(color)

  return (
    <div style={{ width: `${size}px`, height: `${size}px`, position: 'relative' }}>
      <style>{`@keyframes CircularPercentageChartKeyFrames { 0% { stroke-dasharray: 0 100; }}`}</style>
      <svg viewBox="0 0 36 36">
        <path
          style={{ fill: 'none', stroke: cssTrackColor, strokeWidth: 1 }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          strokeDasharray={`${value}, 100`}
          strokeLinecap="round"
          style={{
            fill: 'none',
            stroke: cssPercentageColor,
            strokeWidth: 2,
            animation: 'CircularPercentageChartKeyFrames 1.5s ease-out forwards'
          }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <Text
        color={color}
        font="large"
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
