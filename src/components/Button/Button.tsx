import React from 'react'
import { Button as BButton, IButtonProps, Classes } from '@blueprintjs/core'
import css from './Button.css'

export interface ButtonProps extends Omit<IButtonProps, 'icon'> {
  icon?: IButtonProps['icon'] | React.FunctionComponent<any>
  children?: React.ReactChild
}

function Button(props: ButtonProps) {
  let { icon } = props

  if (typeof icon === 'function') {
    const Icon = icon as React.ElementType
    icon = (
      <span className={Classes.ICON}>
        <Icon />
      </span>
    )
  }

  return <BButton {...props} icon={icon} className={css.button} />
}

export { Button }
