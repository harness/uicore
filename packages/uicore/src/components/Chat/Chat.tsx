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
import { Layout } from '../../index'
import css from './Chat.css'

interface SuggestionType {
  id: string
  text: string
}

type Suggestion = SuggestionType

type MessageRole = 'system' | 'user'

export interface MessageBase {
  id: string
  role: MessageRole
  type: string
  showHelpfulButton?: boolean
  additionalData?: Record<string, unknown>
  // Allow for generic content property that all message types will have
  content?: unknown
}

// Built-in message types for backward compatibility
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

export interface PreviewMessage extends MessageBase {
  type: 'preview'
  title: string
  content: string
}

// Union type for built-in message types
export type BuiltInMessage =
  | TextMessage
  | YamlMessage
  | SuggestionsMessage
  | CardMessage
  | ErrorMessage
  | PreviewMessage

// Generic message type to allow for custom message types
export type Message = BuiltInMessage | (MessageBase & Record<string, unknown>)

// Common props for all renderers
export interface CommonRendererProps {
  role: MessageRole
  handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
}

export interface ChatProps {
  onUserMessageAsync?: (message: TextMessage, abortSignal?: AbortSignal) => Promise<Array<Omit<Message, 'role' | 'id'>>>
  onUserMessage?: (message: TextMessage) => void
  initialMessages?: Message[]
  messages?: Message[]
  showLoader?: boolean
  loader?: React.ReactElement
  systemMessageClassName?: string
  userMessageClassName?: string
  messageRenderers?: Record<string, MessageRenderer>
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
  scrollToEnd: () => void
}

// Type for message renderers
export type MessageRenderer = (
  message: Message,
  options: {
    role: MessageRole
    handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
    addTextToInput?: (text: string) => void
    sendMessage?: (text: string) => void
  }
) => React.ReactNode

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`
}

function useChatMessages(initialMessages: Message[] = [], externalMessages?: Message[]) {
  const [internalMessages, setInternalMessages] = useState<Message[]>(initialMessages)

  const isControlled = externalMessages !== undefined

  const displayMessages = isControlled ? externalMessages : internalMessages

  useEffect(() => {
    if (!isControlled) {
      setInternalMessages(initialMessages)
    }
  }, [initialMessages, isControlled])

  const clearMessages = () => {
    if (!isControlled) {
      setInternalMessages([])
    }
  }

  const addMessages = (newMessages: Message[]) => {
    if (!isControlled) {
      setInternalMessages(prevMessages => [...prevMessages, ...newMessages])
    }
  }

  return {
    messages: displayMessages || [],
    isControlled,
    internalMessages,
    setInternalMessages,
    clearMessages,
    addMessages
  }
}

export const Chat = forwardRef((props: ChatProps, ref) => {
  const {
    initialMessages = [],
    messages: externalMessages,
    loader,
    messageRenderer,
    messageRenderers = {}, // Default to empty object
    inputProps,
    submitButtonProps,
    showLoader = false,
    hideInputArea = false
  } = props

  // Use custom hook to manage messages
  const { messages, isControlled, setInternalMessages, clearMessages, addMessages } = useChatMessages(
    initialMessages,
    externalMessages
  )

  const [userInput, setUserInput] = useState<string>('')
  const [animatedMessages, setAnimatedMessages] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<boolean>(false)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToEnd = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useImperativeHandle(ref, () => ({
    getMessages: () => messages,
    clearMessages,
    addMessages,
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
    const messageType = message.type

    // First check if there's a renderer in the new messageRenderers prop
    if (messageRenderers && messageRenderers[messageType]) {
      return messageRenderers[messageType](message, {
        role: message.role,
        handleHelpfulClick: props.handleHelpfulClick,
        addTextToInput: text => setUserInput(text),
        sendMessage: text => {
          setUserInput(text)
          handleSubmit(text)
        }
      })
    }

    // For backward compatibility, check the legacy messageRenderer prop
    switch (messageType) {
      case 'text': {
        const textMessage = message as TextMessage
        if (messageRenderer?.text) {
          return (
            <messageRenderer.text
              message={textMessage}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return (
          <TextMessage
            content={typeof textMessage.content === 'string' ? textMessage.content : ''}
            isMarkdown={textMessage.isMarkdown}
            color={message.role === 'user' ? Color.WHITE : Color.GREY_600}
            role={message.role}
            messageId={message.id}
            handleHelpfulClick={props.handleHelpfulClick}
            showHelpfulButton={message.showHelpfulButton}
          />
        )
      }
      case 'preview': {
        const previewMessage = message as PreviewMessage
        if (messageRenderer?.preview) {
          return (
            <messageRenderer.preview
              message={previewMessage}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return null
      }
      case 'yaml': {
        const yamlMessage = message as YamlMessage
        if (messageRenderer?.yaml) {
          return (
            <messageRenderer.yaml
              message={yamlMessage}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return <YamlMessage content={typeof yamlMessage.content === 'string' ? yamlMessage.content : ''} />
      }
      case 'suggestions': {
        const suggestionsMessage = message as SuggestionsMessage
        if (messageRenderer?.suggestions) {
          return (
            <messageRenderer.suggestions
              message={suggestionsMessage}
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
          <SuggestionsMessage
            content={Array.isArray(suggestionsMessage.content) ? suggestionsMessage.content : []}
            handleClick={suggestion => setUserInput(suggestion.text)}
          />
        )
      }
      case 'card': {
        const cardMessage = message as CardMessage
        if (messageRenderer?.card) {
          return (
            <messageRenderer.card
              message={cardMessage}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        // We need to handle the CardContent type safely
        const cardContent = cardMessage.content as unknown
        return <Card content={cardContent as CardContent} />
      }
      case 'error': {
        const errorMessage = message as ErrorMessage
        if (messageRenderer?.error) {
          return (
            <messageRenderer.error
              message={errorMessage}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return <Error content={typeof errorMessage.content === 'string' ? errorMessage.content : ''} />
      }
      default:
        return null
    }
  }

  const handleSubmit = (text: string = userInput) => {
    if (!text.trim() || loading) return

    const newMessage: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      role: 'user',
      content: text.trim()
    }

    // If the component is controlled by parent, just call onUserMessage and let parent handle it
    if (isControlled) {
      if (props.onUserMessage) {
        props.onUserMessage(newMessage)
      }
      setUserInput('')
      return
    }

    // For uncontrolled mode, handle the message internally
    const newMessages = [...messages, newMessage]
    setInternalMessages(newMessages)
    setAnimatedMessages(prev => new Set([...prev, newMessage.id]))
    setUserInput('')
    setLoading(true)

    // If onUserMessageAsync is not provided, we can't process the message further
    if (!props.onUserMessageAsync) {
      setLoading(false)
      return
    }

    // Create abort controller for the API request
    const controller = new AbortController()
    setAbortController(controller)

    // Send the message to the API and handle the response
    props.onUserMessageAsync(newMessage, controller.signal)
      .then((response: Array<Omit<Message, 'role' | 'id'>>) => {
        // Create system messages from the response
        const messagesReceived = response.map(
          msg =>
            ({
              id: generateUniqueId(),
              role: 'system',
              ...msg
            } as Message)
        )

        // Add the system messages to the chat
        setInternalMessages([...newMessages, ...messagesReceived])
        setAnimatedMessages(prev => new Set([...prev, ...messagesReceived.map(m => m.id)]))
      })
      .catch((errorMessage: Omit<Message, 'role' | 'id'>) => {
        // Handle error response
        const message = {
          id: generateUniqueId(),
          role: 'system',
          ...errorMessage
        } as Message
        setInternalMessages([...newMessages, message])
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
      // Allow multiline input when Shift+Enter is pressed
      if (e.shiftKey) {
        return // Let the default behavior happen (new line)
      }

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
