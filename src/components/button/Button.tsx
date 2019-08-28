import React from 'react'
import { Button, AnchorButton, IButtonProps, Classes } from '@blueprintjs/core'
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
// - If href is provided, button becomes a link (aka AnchorButton).
// - Not all icons are suitable to be a button icon (the best icons are drawed
//   with simple strokes or fills).
// - This component combines Blueprint <Button/> and <AnchorButton/>. When `href`
//   prop is passed (with optional `target` prop), <AnchorButton/> is used.
//

interface Props extends Omit<IButtonProps, 'active'> {
  id: string
  href?: string
  target?: string
}

export default function(props: Props) {
  let { icon, href } = props
  const Component = (href ? AnchorButton : Button) as typeof React.Component

  if (typeof icon === 'function') {
    const Icon = icon as typeof React.Component
    icon = (
      <span className={Classes.ICON}>
        <Icon />
      </span>
    )
  }

  return <Component {...props} icon={icon} className={css.button} />
}

function foo(a: any) {}
