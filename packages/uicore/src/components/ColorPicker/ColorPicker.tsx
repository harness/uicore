/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { HTMLAttributes, useEffect } from 'react'
import { Button, ButtonProps } from '../Button/Button'
import React, { useState } from 'react'
import { Container } from '../Container/Container'
import { Position, Classes } from '@blueprintjs/core'
import css from './ColorPicker.css'
import { Icon } from '@harness/icons'
import cx from 'classnames'

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  color?: string
  disable?: boolean
  width?: ButtonProps['width']
  height?: ButtonProps['height']
  onChange?: (color: string) => void
}

// NextGen UI Colors (not finalized yet)
// @see https://www.sketch.com/s/0f81cf53-d980-4da3-bdbf-2dd49a875922/a/ndyo00#Inspector
const colors = [
  '#e63535',
  '#ff3b3b',
  '#ff5c5c',
  '#ff8080',
  '#ffe6e6', // red
  '#05a660',
  '#06c270',
  '#39d98a',
  '#57eba1',
  '#e3fff1', // green
  '#004fc4',
  '#0063f7',
  '#5b8def',
  '#9dbff9',
  '#e5f0ff', // blue
  '#e6b800',
  '#ffcc00',
  '#fddd48',
  '#fded72',
  '#fffee6', // yellow
  '#e67a00',
  '#ff8800',
  '#fdac42',
  '#fccc75',
  '#fff8e6', // orange
  '#00b7c4',
  '#00cfde',
  '#73dfe7',
  '#a9eff2',
  '#e6ffff', // teal
  '#4d0099',
  '#6600cc',
  '#ac5dd9',
  '#dda5e9',
  '#ffe6ff', // purple
  '#e4e4eb',
  '#ebebf0',
  '#f2f2f5',
  '#fafafc',
  '#ffffff', // grey
  '#1c1c28',
  '#28293d',
  '#555770',
  '#8f90a6',
  '#c7c9d9' // black
]

export const ColorPickerColors = colors

export function ColorPicker(props: ColorPickerProps) {
  const [selected, setSelected] = useState((props.color || 'transparent').toLowerCase())
  const width = Math.max(props.width ? parseInt(props.width as string) : 60, 60)

  useEffect(() => {
    props.color ? setSelected(props.color.toLowerCase()) : null
  }, [props])

  return (
    <Button
      className={css.picker}
      text={
        <span
          className={cx(css.color, css[selected])}
          style={{ width: `calc(${width}px - 45px)`, background: selected }}></span>
      }
      rightIcon="caret-down"
      width={width}
      height={props.height}
      tooltip={
        <Container padding="medium" className={css.grid}>
          {colors.map(color => (
            <button
              type="button"
              tabIndex={0}
              key={color}
              style={{ background: color }}
              className={cx(selected === color && css.selected, Classes.POPOVER_DISMISS)}
              onClick={() => {
                setSelected(color)
                props?.onChange?.(color)
              }}>
              {selected === color && <Icon size={16} name="dot" color="white" />}
            </button>
          ))}
        </Container>
      }
      tooltipProps={{
        interactionKind: 'click',
        minimal: true,
        position: Position.BOTTOM_LEFT,
        hasBackdrop: true
      }}
    />
  )
}
