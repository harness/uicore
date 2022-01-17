/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useMemo, useState } from 'react'
import { Container } from '../Container/Container'
import { Intent } from '../../core/Intent'
import css from './ButtonGroup.css'
import cx from 'classnames'
import { Button, ButtonProps } from '../Button/Button'

export interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
  return <Container className={cx(css.btnGroup, className)}>{children}</Container>
}

export interface OptionButtonProps extends ButtonProps {
  value: string | number
  selected?: boolean
}

export interface OptionsButtonGroupProps {
  intent?: Intent
  onChange?: (value: string | number) => void
  options: OptionButtonProps[]
}

export const OptionsButtonGroup: React.FC<OptionsButtonGroupProps> = ({ intent, options, onChange }) => {
  const [index, setIndex] = useState(-1)
  const buttons = useMemo(
    () =>
      options.map((props, _index) => {
        if (props.selected && index === -1) {
          setIndex(_index)
        }
        const _intent = index === _index ? { intent: intent || Intent.PRIMARY } : null
        return (
          <Button
            key={props.value}
            {...props}
            {..._intent}
            onClick={() => {
              if (_index !== index) {
                setIndex(_index)
                if (onChange) onChange(props.value)
              }
            }}
          />
        )
      }),
    [index, intent, options, onChange]
  )

  return <ButtonGroup>{buttons}</ButtonGroup>
}
