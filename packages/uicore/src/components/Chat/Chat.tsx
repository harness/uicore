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
import { CardContent } from './message-renderers/Card'
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
  additionalData?: Record<string, unknown>
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

export interface PreviewMessage extends MessageBase {
  type: 'preview'
  title: string
  content: string
}

export type Message = TextMessage | YamlMessage | SuggestionsMessage | CardMessage | ErrorMessage | PreviewMessage

// Common props for all renderers
export interface CommonRendererProps {
  role: MessageRole
  handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
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

export interface ChatProps {
  handleNewMessage: (message: TextMessage, abortSignal?: AbortSignal) => Promise<Array<Omit<Message, 'role' | 'id'>>>
  initialMessages?: Message[]
  showLoader?: boolean
  loader?: React.ReactElement
  systemMessageClassName?: string
  userMessageClassName?: string
  /**
   * Registry of message renderers by type.
   * This is the preferred way to register custom message renderers.
   * Example: { 'custom-type': (message, options) => <CustomRenderer {...message} /> }
   */
  messageRenderers?: Record<string, MessageRenderer>
  /**
   * Legacy way to provide renderers for built-in message types.
   * Consider using messageRenderers instead for more flexibility.
   * @deprecated Use messageRenderers for better extensibility
   */
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

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`
}

export const Chat = forwardRef<ChatRef, ChatProps>(
  (props, ref): JSX.Element => {
    const {
      initialMessages = [],
      handleNewMessage,
      loader,
      messageRenderer,
      messageRenderers = {}, // Default to empty object
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

    const scrollToEnd = () => {
      // Get the messages container element
      const container = messagesEndRef.current?.parentElement

      // Check if container exists and has the messagesContainer class
      if (container && container.classList.contains(css.messagesContainer)) {
        // Calculate if user is already at the bottom (with 10px tolerance)
        const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10

        // Only scroll if user is already at the bottom
        if (isAtBottom) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Fallback to original behavior if container can't be found
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    useImperativeHandle(ref, () => ({
      getMessages: () => messages,
      clearMessages,
      addMessages,
      scrollToEnd,
      // Add support for addToStream method with flexible additionalData parameter
      addToStream: (message: Message, additionalData?: Record<string, unknown>) => {
        // Create a new message with additionalData merged in
        const messageWithData = {
          ...message,
          additionalData: {
            ...message.additionalData,
            ...additionalData
          }
        }
        addMessages([messageWithData])
      }
    }))

    useEffect(() => {
      if (loading !== showLoader) {
        setLoading(showLoader)
      }
    }, [showLoader])

    useEffect(() => {
      scrollToEnd()
    }, [messages])

    // Only provide text renderer by default, all other types must be provided by parent
    const getDefaultRenderer = (messageType: string, message: Message) => {
      // Only handle text messages by default
      if (messageType === 'text') {
        const textMessage = message as TextMessage
        return (
          <TextMessage
            content={textMessage.content}
            isMarkdown={textMessage.isMarkdown}
            color={message.role === 'user' ? Color.WHITE : Color.GREY_600}
            role={message.role}
            messageId={message.id}
            handleHelpfulClick={props.handleHelpfulClick}
            showHelpfulButton={message.showHelpfulButton}
          />
        )
      }

      // For all other message types, return null if no renderer is provided by parent
      return null
    }

    // Get legacy renderer if available
    const getLegacyRenderer = (messageType: string, message: Message) => {
      switch (messageType) {
        case 'text':
          if (messageRenderer?.text) {
            return (
              <messageRenderer.text
                message={message as TextMessage}
                role={message.role}
                handleHelpfulClick={props.handleHelpfulClick}
              />
            )
          }
          break
        case 'yaml':
          if (messageRenderer?.yaml) {
            return (
              <messageRenderer.yaml
                message={message as YamlMessage}
                role={message.role}
                handleHelpfulClick={props.handleHelpfulClick}
              />
            )
          }
          break
        case 'suggestions':
          if (messageRenderer?.suggestions) {
            return (
              <messageRenderer.suggestions
                message={message as SuggestionsMessage}
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
          break
        case 'card':
          if (messageRenderer?.card) {
            return (
              <messageRenderer.card
                message={message as CardMessage}
                role={message.role}
                handleHelpfulClick={props.handleHelpfulClick}
              />
            )
          }
          break
        case 'error':
          if (messageRenderer?.error) {
            return (
              <messageRenderer.error
                message={message as ErrorMessage}
                role={message.role}
                handleHelpfulClick={props.handleHelpfulClick}
              />
            )
          }
          break
        case 'preview':
          if (messageRenderer?.preview) {
            return (
              <messageRenderer.preview
                message={message as PreviewMessage}
                role={message.role}
                handleHelpfulClick={props.handleHelpfulClick}
              />
            )
          }
          break
      }
      return null
    }

    const renderMessage = (message: Message) => {
      const messageType = message.type

      // Common options for all renderers
      const options = {
        role: message.role,
        handleHelpfulClick: props.handleHelpfulClick,
        addTextToInput: (text: string) => setUserInput(text),
        sendMessage: (text: string) => {
          setUserInput(text)
          handleSubmit(text)
        }
      }

      // Priority 1: Check if there's a custom renderer in messageRenderers
      if (messageRenderers && messageRenderers[messageType]) {
        return messageRenderers[messageType](message, options)
      }

      // Priority 2: Check for legacy renderer
      const legacyOutput = getLegacyRenderer(messageType, message)
      if (legacyOutput !== null) {
        return legacyOutput
      }

      // Priority 3: Only text messages have a default renderer
      // All other types will render nothing unless provided by parent
      return getDefaultRenderer(messageType, message)
    }

    const handleSubmit = (text: string = userInput) => {
      if (!text.trim() || loading) return

      const newMessage: TextMessage = {
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
  }
)
