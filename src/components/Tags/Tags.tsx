import React from 'react'
import { ITagProps } from '@blueprintjs/core'
import css from './tags.css'
import cx from 'classnames'

function Tag(props: ITagProps) {
  return (
    <span className={css.main}>
      <span {...props} className={cx('bp3-tag', props.className)}>
        {props.children}
      </span>
    </span>
  )
}

export { Tag }
