import React from 'react'
import { Button as BButton, IButtonProps, Classes } from '@blueprintjs/core'
import css from './Button.css'

function Button(props: IButtonProps) {
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
