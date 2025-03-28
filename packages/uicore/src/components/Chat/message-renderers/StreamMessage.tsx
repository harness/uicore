import React from 'react'
import { Color } from '@harness/design-system'
import { Layout } from '../../../index'
import { CommonRendererProps, StreamMessage, TextMessage as TextMessageType } from '../Chat'
import TextMessage from './TextMessage'

interface StreamMessageProps extends CommonRendererProps {
  message: StreamMessage
  messageRenderer?: {
    text?: React.ComponentType<{ message: TextMessageType } & CommonRendererProps>
  }
}

const StreamMessageRenderer: React.FC<StreamMessageProps> = ({
  message,
  role,
  handleHelpfulClick,
  messageRenderer
}) => {
  if (message.messages.length === 0) {
    return null
  }

  return (
    <Layout.Vertical spacing="none" width="100%">
      {message.messages.map((msg, msgIndex) => {
        const isFirst = msgIndex === 0
        const isLast = msgIndex === message.messages.length - 1 || msg.isLastInStream

        return (
          <>
            {messageRenderer?.text ? (
              <messageRenderer.text
                isFirstInStream={isFirst}
                stream={true}
                key={`${message.id}-${msgIndex}`}
                message={{
                  ...msg,
                  id: `${message.id}-${msgIndex}`,
                  role: role,
                  type: 'text'
                }}
                role={role}
                handleHelpfulClick={handleHelpfulClick}
              />
            ) : (
              <TextMessage
                key={`${message.id}-${msgIndex}`}
                content={msg.content}
                isMarkdown={msg.isMarkdown}
                color={role === 'user' ? Color.WHITE : Color.GREY_600}
                role={role}
                messageId={isLast && message.isComplete ? message.id : undefined}
                handleHelpfulClick={handleHelpfulClick}
                showHelpfulButton={isLast && message.isComplete && message.showHelpfulButton}
              />
            )}
          </>
        )
      })}
    </Layout.Vertical>
  )
}

export default StreamMessageRenderer
