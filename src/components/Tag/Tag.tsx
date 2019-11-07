import React from 'react'
import { ITagProps, Intent, Tag as BpTag } from '@blueprintjs/core'
import css from './tag.css'

function Tag(props: ITagProps) {
  return (
    <span className={css.main}>
      <BpTag {...props}>{props.children}</BpTag>
    </span>
  )
}

export { Tag, Intent }
