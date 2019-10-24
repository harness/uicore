import React, { useState, MouseEvent } from 'react'
import { Button as BButton, IButtonProps, Classes } from '@blueprintjs/core'
import css from './Button.css'

export interface ButtonProps extends Omit<IButtonProps, 'icon'> {
  icon?: IButtonProps['icon'] | React.FunctionComponent<any>
  children?: React.ReactChild
}

function Button(props: ButtonProps) {
  let { icon } = props
  const [loading, setLoading] = useState(props.loading === true)

  const onClick = async (event: MouseEvent) => {
    if (loading) {
      return
    }
    if (props.onClick) {
      setLoading(true)

      try {
        await props.onClick(event)
      } catch (e) {
        throw e
      } finally {
        setLoading(false)
      }
    }
  }

  if (typeof icon === 'function') {
    const Icon = icon as React.ElementType
    icon = (
      <span className={Classes.ICON}>
        <Icon />
      </span>
    )
  }

  return <BButton {...props} loading={loading} onClick={onClick} icon={icon} className={css.button} />
}

export { Button }
