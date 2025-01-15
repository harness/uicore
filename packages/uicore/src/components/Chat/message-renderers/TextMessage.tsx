import React from 'react'
import { Color } from '@harness/design-system'
import { marked } from 'marked'
import { Text, FontVariation } from '../../../index'
import { sanitizeHTML } from '../../../utils/util'
import css from './TextMessage.css'

const TextMessage: React.FC<{ content: string; color: Color; isMarkdown?: boolean }> = ({
  content,
  color,
  isMarkdown
}) => {
  const getMarkdownText = () => {
    const rawMarkup = marked.parse(content)
    const sanitized = sanitizeHTML(rawMarkup)
    return { __html: sanitized }
  }

  const textProps = {
    font: { variation: FontVariation.SMALL },
    color
  }

  return isMarkdown ? (
    <Text {...textProps} className={css.markdown}>
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={getMarkdownText()}></p>
    </Text>
  ) : (
    <Text {...textProps}>{content}</Text>
  )
}

export default TextMessage
