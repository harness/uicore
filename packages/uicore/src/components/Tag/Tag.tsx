/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { ITagProps, Intent, Tag as BpTag } from '@blueprintjs/core'
import css from './Tag.css'

function Tag(props: ITagProps) {
  return (
    <span className={css.main}>
      <BpTag {...props}>{props.children}</BpTag>
    </span>
  )
}

export { Tag, Intent }
