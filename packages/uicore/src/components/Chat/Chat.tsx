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
import Card, { CardContent } from './message-renderers/Card'
import { Layout } from '../../index'
import css from './Chat.css'

interface SuggestionType {
  id: string
  text: string
}

type Suggestion = SuggestionType

type MessageRole = 'system' | 'user'
export interface MessageBase<T = Record<string, any>, P = any> {
  content: P
  type: string
  id: string
  role: MessageRole
  showHelpfulButton?: boolean
  additionalData?: T
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

export type Message =
  | (TextMessage | YamlMessage | SuggestionsMessage | CardMessage | ErrorMessage | PreviewMessage)
  | MessageBase

// Common props for all renderers
export interface CommonRendererProps {
  role: MessageRole
  previousMessageRole?: MessageRole
  handleHelpfulClick?: (messageId: string, isHelpful: boolean) => void
}

// Helper type for extracting message types from a mapping
export type MessageTypeMapping<T> = { [K in keyof T]: T[K] extends MessageBase ? T[K] : never }

// Generic interface for Chat props
export interface ChatProps<T = Record<string, MessageBase>> {
  handleNewMessage: (message: TextMessage, abortSignal?: AbortSignal) => Promise<Array<Omit<Message, 'role' | 'id'>>>
  initialMessages?: Message[]
  showLoader?: boolean
  loader?: React.ReactElement
  systemMessageClassName?: string
  userMessageClassName?: string
  /**
   * @deprecated Use messageRenderers
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
  messageRenderers?: {
    [K in keyof T]?: React.FC<{ message: T[K] extends MessageBase ? T[K] : MessageBase } & CommonRendererProps>
  }
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

export interface ChatRef<T = Record<string, MessageBase>> {
  getMessages: () => Message[]
  clearMessages: () => void
  addMessages: <K extends keyof T>(
    messages: Array<Omit<T[K], 'id' | 'role'> & { id?: string; role?: MessageRole; type: K }>
  ) => void
  scrollToEnd: () => void
}

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`
}

// Implementation of the Chat component with generic support
function ChatComponent<T = Record<string, MessageBase>>(props: ChatProps<T>, ref: React.ForwardedRef<ChatRef<T>>) {
  const {
    initialMessages = [],
    handleNewMessage,
    loader,
    messageRenderer,
    messageRenderers,
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useImperativeHandle(ref, () => ({
    getMessages: () => messages,
    clearMessages,
    addMessages: <K extends keyof T>(
      messages: Array<Omit<T[K], 'id' | 'role'> & { id?: string; role?: MessageRole; type: K }>
    ) => {
      // Process messages to ensure they have id and role
      const processedMessages = (messages.map(msg => ({
        ...msg,
        id: msg.id || generateUniqueId(),
        role: msg.role || 'system'
      })) as unknown) as Message[]

      addMessages(processedMessages)
    },
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

  const renderMessage = (message: Message, previousMessageRole?: MessageRole) => {
    switch (message.type) {
      case 'text':
        if (messageRenderer?.text) {
          return (
            <messageRenderer.text
              message={message as TextMessage}
              role={message.role}
              previousMessageRole={previousMessageRole}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return (
          <TextMessage
            content={message.content}
            isMarkdown={(message as TextMessage).isMarkdown}
            color={message.role === 'user' ? Color.WHITE : Color.GREY_600}
            role={message.role}
            messageId={message.id}
            handleHelpfulClick={props.handleHelpfulClick}
            showHelpfulButton={message.showHelpfulButton}
          />
        )
      case 'preview': {
        if (messageRenderer?.preview) {
          return (
            <messageRenderer.preview
              message={message as PreviewMessage}
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
            <messageRenderer.yaml
              message={message as YamlMessage}
              role={message.role}
              handleHelpfulClick={props.handleHelpfulClick}
            />
          )
        }
        return <YamlMessage content={message.content} />
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
        return (
          <SuggestionsMessage content={message.content} handleClick={suggestion => setUserInput(suggestion.text)} />
        )
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
        return <Card content={message.content} />
      default:
        {
          const defaultMessage = message as MessageBase
          const messageType = defaultMessage.type as keyof T
          if (messageRenderers?.[messageType]) {
            // We need to cast here because TypeScript can't verify the exact type at runtime
            const Renderer = messageRenderers[messageType] as React.ComponentType<
              { message: MessageBase } & CommonRendererProps
            >
            return (
              <Renderer
                previousMessageRole={previousMessageRole}
                message={message as any} // Type assertion needed since we can't guarantee the exact type at runtime
                role={defaultMessage.role}
                handleHelpfulClick={props.handleHelpfulClick}
              />
            )
          }
        }

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

    handleNewMessage(newMessage as TextMessage, controller.signal)
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
        {messages.map((message, index) => {
          const messageClass = message.role === 'system' ? props.systemMessageClassName : props.userMessageClassName
          const isAnimated = animatedMessages.has(message.id)

          const previousMessageRole = index > 0 ? messages[index - 1].role : undefined

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
              {renderMessage(message, previousMessageRole)}
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

// Export the Chat component with proper generic typing
export const Chat = forwardRef(ChatComponent) as (<T = Record<string, MessageBase>>(
  props: ChatProps<T> & { ref?: React.ForwardedRef<ChatRef<T>> }
) => JSX.Element) & {
  displayName?: string
}

Chat.displayName = 'Chat'
