/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Icon, IconProps } from '@harness/icons'
import React, { useEffect } from 'react'
import { Text, Utils } from '../..'
import { Easing, useTween } from '../../hooks/useTween'
import { FontSize, FontProps, Color } from '@harness/design-system'

export interface CircularPercentageChartProps {
  size: number
  value: number
  label?: string | number
  icon?: IconProps
  trackColor?: Color
  color: Color
  font?: FontSize | FontProps
}

export const CircularPercentageChart: React.FC<CircularPercentageChartProps> = ({
  size,
  value,
  label = value,
  trackColor = Color.GREY_300,
  color,
  font,
  icon
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
      {icon ? (
        <Icon
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          {...icon}
        />
      ) : (
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
      )}
    </div>
  )
}
