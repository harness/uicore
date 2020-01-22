import React, { useMemo, useState } from 'react'
import { Container } from '../Container/Container'
import { Intent } from '../../core/Intent'
import css from './ButtonGroup.css'
import { Button, ButtonProps } from '../Button/Button'

export const ButtonGroup: React.FC<{}> = ({ children }) => {
  return <Container className={css.btnGroup}>{children}</Container>
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
