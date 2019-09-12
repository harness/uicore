import React, { MouseEvent } from 'react'
import css from './Link.css'
import Utils from '../../core/Utils'

export default function(props: React.HTMLProps<HTMLLinkElement>) {
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
    <a {...props} {...extra} className={css.link}>
      {props.children}
    </a>
  )
}
