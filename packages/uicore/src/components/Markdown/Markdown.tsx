/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import css from './Markdown.css'

export interface MarkdownProps {
  value: string
  className?: string
}

const Markdown: React.FC<MarkdownProps> = ({ value, className }) => {
  return <ReactMarkdown className={cx(css.markdown, className)}>{value}</ReactMarkdown>
}
export default Markdown
