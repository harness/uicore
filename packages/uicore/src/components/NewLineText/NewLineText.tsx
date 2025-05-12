/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import css from './NewLineText.css'
import { Text, TextProps } from '../Text/Text'

export function NewLineText(props: TextProps): React.ReactElement {
  const { children, className, lineClamp } = props
  const hasLineClamp = lineClamp ? css.hasLineClamp : ''
  const newLineClass = css.newLineText

  // Check if children is a string before calling split
  const lines = typeof children === 'string' ? children.split('\n') : []
  const hasMoreLines = lineClamp && lines.length > lineClamp

  // If we're adding tooltip functionality, we'll ensure the untruncated content appears in the tooltip
  // when hovering over the entire component, but only if lineClamp is provided

  // Create inner text elements for each line
  const newLineText =
    typeof children === 'string'
      ? lines.map((line: string, index: number) => {
          const isLastLine = lineClamp && index === lineClamp - 1
          const shouldAddEllipsis = isLastLine && hasMoreLines
          return (
            <React.Fragment key={`${line}-${index}`}>
              <Text>{shouldAddEllipsis ? `${line}...` : line}</Text>
              {!isLastLine && <br />}
            </React.Fragment>
          )
        })
      : [children]

  return (
    <Text {...props} className={cx(className, hasLineClamp, newLineClass)}>
      {/* If lineClamp is provided, truncate to that number of lines, otherwise show all lines */}
      {lineClamp ? newLineText.slice(0, lineClamp) : newLineText}
    </Text>
  )
}
