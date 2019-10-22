import React from 'react'
import { Button as BButton, IButtonProps, Classes } from '@blueprintjs/core'
import css from './Button.css'

// import Icons from '../../icons'
//
// This typing is elegant, except VSCode does not do auto-complete for it.
//
// interface Props extends Omit<React.ComponentProps<typeof Button>, 'id'> {
//   id: string // Force id prop must be provided
// }
//
// Notes:
// - Remove 'active' prop (VSCode will stop auto-complete for it) - we don't need it.
// - Force id prop must be provided to make it easier to locate the button in UI Tests.
// - Not all icons are suitable to be a button icon (the best icons are drawed
//   with simple strokes or fills).
//

interface Props extends Omit<IButtonProps, 'active'> {
  /** Each button must have a unique id to support E2E testing */
  id: string

  /** Intent will determine button look */
  intent?: Intent
}

function Button(props: Props) {
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
