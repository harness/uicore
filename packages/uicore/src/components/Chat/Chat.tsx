/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import cx from 'classnames'
import { Color } from '@harness/design-system'
import { Icon, IconProps } from '@harness/icons'
import TextMessage from './message-renderers/TextMessage'
import YamlMessage from './message-renderers/YamlMessage'
import SuggestionsMessage from './message-renderers/Suggestions'
import Error from './message-renderers/Error'
import Card, { CardContent } from './message-renderers/Card'
import StreamMessageRenderer from './message-renderers/StreamMessage'
import { Layout } from '../../index'
import css from './Chat.css'

interface SuggestionType {
  id: string
  text: string
}

type Suggestion = SuggestionType

type MessageRole = 'system' | 'user'
interface MessageBase {
  id: string
  role: MessageRole
  showHelpfulButton?: boolean
}

export interface TextMessage extends MessageBase {
  type: 'text'
  content: string
  isMarkdown?: boolean
}

export interface YamlMessage extends MessageBase {
  type: 'yaml'
  content: string
}

export interface ErrorMessage extends MessageBase {
  type: 'error'
  content: string
}

export interface SuggestionsMessage extends MessageBase {
  type: 'suggestions'
  content: Suggestion[]
}

export interface CardMessage extends MessageBase {
  type: 'card'
  content: CardContent
}

export interface StreamTextMessage extends Omit<TextMessage, 'id' | 'role'> {
  isFirstInStream?: boolean
  isLastInStream?: boolean
}

export interface StreamMessage extends MessageBase {
  type: 'stream'
  streamId: string
  content: StreamTextMessage[]
  isComplete: boolean
}

export interface PreviewMessage extends MessageBase {
  type: 'preview'
  title: string
  content: string
}

export type Message =
  | TextMessage
  | YamlMessage
  | SuggestionsMessage
  | CardMessage
  | ErrorMessage
  | StreamMessage
  | PreviewMessage

// Common props for all renderers
export interface CommonRendererProps {
  role: MessageRole
  handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
  stream?: boolean
  isFirstInStream?: boolean
}

export interface ChatProps {
  handleNewMessage: (message: TextMessage, abortSignal?: AbortSignal) => Promise<Array<Omit<Message, 'role' | 'id'>>>
  initialMessages?: Message[]
  showLoader?: boolean
  loader?: React.ReactElement
  systemMessageClassName?: string
  userMessageClassName?: string
  messageRenderer?: Partial<{
    yaml: React.FC<{ message: YamlMessage } & CommonRendererProps>
    text: React.FC<{ message: TextMessage } & CommonRendererProps>
    suggestions: React.FC<
      {
        message: SuggestionsMessage
        addTextToInput: (text: string) => void
        sendMessage: (text: string) => void
      } & CommonRendererProps
    >
    card: React.FC<{ message: CardMessage } & CommonRendererProps>
    error: React.FC<{ message: ErrorMessage } & CommonRendererProps>
    stream: React.FC<{ message: StreamMessage } & CommonRendererProps>
    preview: React.FC<{ message: PreviewMessage } & CommonRendererProps>
  }>
  inputProps?: InputProps
  submitButtonProps?: SubmitButtonProps
  hideInputArea?: boolean
  handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
}

interface InputProps {
  placeholder?: string
  className?: string
}

interface SubmitButtonProps {
  className?: string
  iconClassName?: string
  icon?: {
    active?: IconProps
    inactive?: IconProps
  }
}

export interface ChatRef {
  getMessages: () => Message[]
  clearMessages: () => void
  addMessages: (messages: Message[]) => void
  addToStream: (streamId: string, message: Omit<TextMessage, 'id' | 'role'>, isFirstMessage?: boolean) => void
  endStream: (streamId: string, finalMessage?: Omit<TextMessage, 'id' | 'role'>) => void
  scrollToEnd: () => void
}

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`
}

export const Chat = forwardRef((props: ChatProps, ref) => {
  const {
    initialMessages = [],
    handleNewMessage,
    loader,
    messageRenderer,
    inputProps,
    submitButtonProps,
    showLoader = false,
    hideInputArea = false
  } = props
  const [userInput, setUserInput] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [animatedMessages, setAnimatedMessages] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<boolean>(false)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const clearMessages = () => {
    setMessages([])
  }

  const addMessages = (newMessages: Message[]) => {
    setMessages(prevMessages => [...prevMessages, ...newMessages])
  }

  // Stream management methods
  const activeStreams = useRef<Record<string, boolean>>({})

  const addToStream = (streamId: string, message: Omit<TextMessage, 'id' | 'role'>, isFirstMessage = false) => {
    const streamExists = activeStreams.current[streamId]

    if (isFirstMessage || !streamExists) {
      const streamTextMessage: StreamTextMessage = {
        ...message,
        isFirstInStream: true
      }

      const newMessage: StreamMessage = {
        id: generateUniqueId(),
        role: 'system',
        type: 'stream',
        streamId,
        content: [streamTextMessage],
        isComplete: false,
        showHelpfulButton: false
      }

      activeStreams.current[streamId] = true
      setMessages(prevMessages => [...prevMessages, newMessage])
      setAnimatedMessages(prev => new Set([...prev, newMessage.id]))
      return
    }

    // If the stream exists, add to it
    setMessages(prevMessages => {
      const streamIndex = prevMessages.findIndex(msg => msg.type === 'stream' && msg.streamId === streamId)

      if (streamIndex === -1) return prevMessages

      const streamMsg = prevMessages[streamIndex] as StreamMessage
      const updatedStreamMsg = {
        ...streamMsg,
        content: [...streamMsg.content, { ...message }]
      }

      const updatedMessages = [...prevMessages]
      updatedMessages[streamIndex] = updatedStreamMsg

      return updatedMessages
    })
  }

  const endStream = (streamId: string, finalMessage?: Omit<TextMessage, 'id' | 'role'>) => {
    if (!activeStreams.current[streamId]) {
      // Stream doesn't exist or has been closed
      return
    }

    setMessages(prevMessages => {
      const streamIndex = prevMessages.findIndex(msg => msg.type === 'stream' && msg.streamId === streamId)

      if (streamIndex === -1) return prevMessages

      const streamMsg = prevMessages[streamIndex] as StreamMessage
      const updatedMessages = [...streamMsg.content]

      if (finalMessage) {
        // Add the final message with isLastInStream flag
        updatedMessages.push({
          ...finalMessage,
          isLastInStream: true
        })
      } else if (updatedMessages.length > 0) {
        // Mark the last message as the last in stream
        const lastMsgIndex = updatedMessages.length - 1
        updatedMessages[lastMsgIndex] = {
          ...updatedMessages[lastMsgIndex],
          isLastInStream: true
        }
      }

      const updatedStreamMsg = {
        ...streamMsg,
        messages: updatedMessages,
        isComplete: true,
        showHelpfulButton: true
      }

      const newMessages = [...prevMessages]
      newMessages[streamIndex] = updatedStreamMsg

      return newMessages
    })

    delete activeStreams.current[streamId]
  }

  const scrollToEnd = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useImperativeHandle(ref, () => ({
    getMessages: () => messages,
    clearMessages,
    addMessages,
    addToStream,
    endStream,
    scrollToEnd
  }))

  useEffect(() => {
    if (loading !== showLoader) {
      setLoading(showLoader)
    }
  }, [showLoader])

  useEffect(() => {
    scrollToEnd()
  }, [messages])

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'text':
        if (messageRenderer?.text) {
          return (
            <messageRenderer.text message={message} role={message.role} handleHelpfulClick={props.handleHelpfulClick} />
          )
        }
        return (
          <TextMessage
            content={message.content}
            isMarkdown={message.isMarkdown}
            color={message.role === 'user' ? Color.WHITE : Color.GREY_600}
            role={message.role}
            messageId={message.id}
            handleHelpfulClick={props.handleHelpfulClick}
            showHelpfulButton={message.showHelpfulButton}
          />
        )
      case 'stream': {
        if (messageRenderer?.stream) {
          return (
            <messageRenderer.stream
              message={message}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return (
          <StreamMessageRenderer
            message={message}
            role={message.role}
            handleHelpfulClick={props.handleHelpfulClick}
            messageRenderer={messageRenderer}
          />
        )
      }
      case 'preview': {
        if (messageRenderer?.preview) {
          return (
            <messageRenderer.preview
              message={message}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return null
      }
      case 'yaml':
        if (messageRenderer?.yaml) {
          return (
            <messageRenderer.yaml message={message} role={message.role} handleHelpfulClick={props.handleHelpfulClick} />
          )
        }
        return <YamlMessage content={message.content} />
      case 'suggestions':
        if (messageRenderer?.suggestions) {
          return (
            <messageRenderer.suggestions
              message={message}
              role={message.role}
              addTextToInput={text => setUserInput(text)}
              sendMessage={text => {
                setUserInput(text)

                handleSubmit(text)
              }}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return (
          <SuggestionsMessage content={message.content} handleClick={suggestion => setUserInput(suggestion.text)} />
        )
      case 'card':
        if (messageRenderer?.card) {
          return (
            <messageRenderer.card message={message} role={message.role} handleHelpfulClick={props.handleHelpfulClick} />
          )
        }
        return <Card content={message.content} />
      case 'error':
        if (messageRenderer?.error) {
          return (
            <messageRenderer.error
              message={message}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return <Error content={message.content} />
      default:
        return null
    }
  }

  const handleSubmit = (text: string = userInput) => {
    if (!text.trim() || loading) return

    const newMessage: Message = {
      id: generateUniqueId(),
      type: 'text',
      role: 'user',
      content: text.trim()
    }

    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setAnimatedMessages(prev => new Set([...prev, newMessage.id]))
    setUserInput('')
    setLoading(true)

    const controller = new AbortController()
    setAbortController(controller)

    handleNewMessage(newMessage, controller.signal)
      .then((response: Array<Omit<Message, 'role' | 'id'>>) => {
        const messagesReceived = response.map(
          msg =>
            ({
              id: generateUniqueId(),
              role: 'system',
              ...msg
            } as Message)
        )

        setMessages([...newMessages, ...messagesReceived])
        setAnimatedMessages(prev => new Set([...prev, ...messagesReceived.map(m => m.id)]))
      })
      .catch((errorMessage: Omit<Message, 'role' | 'id'>) => {
        const message = {
          id: generateUniqueId(),
          role: 'system',
          ...errorMessage
        } as Message
        setMessages([...newMessages, message])
        setAnimatedMessages(prev => new Set([...prev, message.id]))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancelRequest = () => {
    if (abortController) {
      abortController.abort()
      setLoading(false)
      setAbortController(null)
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (loading) {
        abortController?.abort()
      } else {
        handleSubmit()
      }
    }
  }

  const handleUserInput: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    setUserInput(e.target.value)
    e.preventDefault()
  }

  const renderLoader = () => {
    return <div className={css.loaderContainer}>{loader ? loader : 'Loading ...'}</div>
  }

  return (
    <Layout.Vertical className={cx(css.container, { [css.containerWithFooter]: !hideInputArea })}>
      <Layout.Vertical className={css.messagesContainer}>
        {messages.map(message => {
          const messageClass = message.role === 'system' ? props.systemMessageClassName : props.userMessageClassName
          const isAnimated = animatedMessages.has(message.id)

          return (
            <div
              key={message.id}
              className={cx(
                css.message,
                {
                  [css.system]: message.role === 'system',
                  [css.user]: message.role === 'user',
                  [css.text]: message.type === 'text' || message.type === 'error',
                  [css.yaml]: message.type === 'yaml',
                  [css.animate]: isAnimated
                },
                messageClass
              )}
              onAnimationEnd={() => {
                if (isAnimated) {
                  setAnimatedMessages(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(message.id)
                    return newSet
                  })
                }
              }}>
              {renderMessage(message)}
            </div>
          )
        })}
        {loading ? (
          <div className={cx(css.message, css.system, css.text, css.animate, props.systemMessageClassName)}>
            {renderLoader()}
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </Layout.Vertical>

      {!hideInputArea && (
        <div className={css.footer}>
          <div className={css.inputContainer}>
            <textarea
              className={cx(css.userInput, inputProps?.className)}
              autoComplete="off"
              autoFocus
              name="chat-input"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
              placeholder={inputProps?.placeholder || 'Type a message…'}
            />

            <button
              className={cx(css.submitBtn, submitButtonProps?.className)}
              onClick={loading ? handleCancelRequest : () => handleSubmit()}>
              {!loading ? (
                <Icon
                  className={submitButtonProps?.iconClassName}
                  name={'pipeline-deploy'}
                  size={16}
                  {...submitButtonProps?.icon?.active}
                />
              ) : (
                <Icon
                  className={submitButtonProps?.iconClassName}
                  name={'execution-stopped'}
                  size={16}
                  {...submitButtonProps?.icon?.inactive}
                />
              )}
            </button>
          </div>
        </div>
      )}
    </Layout.Vertical>
  )
})
