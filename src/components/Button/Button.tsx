import React from 'react'
import { Button as BButton, AnchorButton, IButtonProps, Classes } from '@blueprintjs/core'
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
  /** Each button must have a unique id to support E2E testing */
  id: string

  /** When href is provided, Button becomes Link which renders as <a/> tag */
  href?: string

  /** Target prop goes along with href */
  target?: string
}

function Button(props: Props) {
  let { icon, href } = props
  const Component = (href ? AnchorButton : BButton) as React.ElementType

  if (typeof icon === 'function') {
    const Icon = icon as React.ElementType
    icon = (
      <span className={Classes.ICON}>
        <Icon />
      </span>
    )
  }

  return <Component {...props} icon={icon} className={css.button} />
}

export { Button }
