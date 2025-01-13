import React from 'react'
import { Color } from '@harness/design-system'
import { marked } from 'marked'
import { Text, FontVariation } from '../../../index'

const TextMessage: React.FC<{ content: string; color: Color; isMarkdown?: boolean }> = ({
  content,
  color,
  isMarkdown
}) => {
  const getMarkdownText = () => {
    var rawMarkup = marked.parse(content)
    return { __html: rawMarkup }
  }

  return (
    <Text font={{ variation: FontVariation.SMALL }} color={color}>
      {isMarkdown ? <span dangerouslySetInnerHTML={getMarkdownText()}></span> : content}
    </Text>
  )
}

export default TextMessage
