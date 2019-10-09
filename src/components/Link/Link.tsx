import React, { MouseEvent } from 'react'
import css from './Link.css'
import { Utils } from '../../core/Utils'
import { StyledProps, omitStyledProps, styledClasses } from '../../core/StyledProps'

type Props = React.HTMLProps<HTMLLinkElement> & StyledProps

function Link(props: Props) {
  let extra: { rel?: string; onClick?: (e: MouseEvent) => void } = {}

  // Make sure all _blank target has proper rel
  // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
  if (/_blank/i.test(props.target || '')) {
    extra.rel = 'noreferrer noopener'
  }

  if (props.disabled) {
    extra.onClick = Utils.stopEvent
  }

  return (
    <a {...omitStyledProps(props)} {...extra} className={styledClasses(props, css.link)}>
      {props.children}
    </a>
  )
}

export { Link }
