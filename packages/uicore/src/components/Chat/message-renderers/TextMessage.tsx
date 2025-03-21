import React from 'react'
import { Color } from '@harness/design-system'
import { marked } from 'marked'
import { Text, FontVariation, Layout } from '../../../index'
import { sanitizeHTML } from '../../../utils/util'
import css from './TextMessage.css'
import { HelpfulButton } from './HelpfulButton'
import { Message } from '../Chat'

interface TextMessageProps {
  content: string
  color: Color
  isMarkdown?: boolean
  role?: Message['role']
  messageId?: string
  handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
  showHelpfulButton?: boolean
}

const TextMessage: React.FC<TextMessageProps> = ({
  content,
  color,
  isMarkdown,
  role = 'user',
  messageId,
  handleHelpfulClick,
  showHelpfulButton = false
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

  const shouldShowHelpfulButton = role === 'system' && showHelpfulButton && handleHelpfulClick && messageId

  return (
    <Layout.Vertical>
      {isMarkdown ? (
        <Text {...textProps} className={css.markdown}>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={getMarkdownText()}></p>
        </Text>
      ) : (
        <Text {...textProps}>{content}</Text>
      )}

      {shouldShowHelpfulButton && <HelpfulButton messageId={messageId} onHelpfulClick={handleHelpfulClick} />}
    </Layout.Vertical>
  )
}

export { TextMessage }
export default TextMessage
