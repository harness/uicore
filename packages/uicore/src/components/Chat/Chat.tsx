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
interface MessageBase {
  id: string
  role: MessageRole
  renderer?: React.FC<{ message: Message }>
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

export type Message = TextMessage | YamlMessage | SuggestionsMessage | CardMessage | ErrorMessage

export interface ChatRef {
  getMessages: () => Message[]
  clearMessages: () => void
  addMessages: (messages: Message[]) => void
  scrollToEnd: () => void
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

export interface ChatProps {
  handleNewMessage: (message: Message, abortSignal?: AbortSignal) => Promise<Array<Omit<Message, 'role' | 'id'>>>
  initialMessages?: Message[]
  showLoader?: boolean
  loader?: React.ReactElement
  systemMessageClassName?: string
  userMessageClassName?: string
  messageRenderer?: Partial<{
    yaml: React.FC<{ message: YamlMessage; role: MessageRole }>
    text: React.FC<{ message: TextMessage; role: MessageRole }>
    suggestions: React.FC<{
      message: SuggestionsMessage
      addTextToInput: (text: string) => void
      sendMessage: (text: string) => void
    }>
    card: React.FC<{ message: CardMessage }>
    error: React.FC<{ message: ErrorMessage }>
  }>
  inputProps?: InputProps
  submitButtonProps?: SubmitButtonProps
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
    showLoader = false
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
    setMessages([...messages, ...newMessages])
  }

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
    const { renderer } = message

    if (renderer) {
      const Component = renderer
      return <Component message={message} />
    }

    switch (message.type) {
      case 'text':
        if (messageRenderer?.text) {
          return <messageRenderer.text message={message} role={message.role} />
        }
        return (
          <TextMessage
            content={message.content}
            isMarkdown={message.isMarkdown}
            color={message.role === 'user' ? Color.WHITE : Color.GREY_600}
          />
        )
      case 'yaml':
        if (messageRenderer?.yaml) {
          return <messageRenderer.yaml message={message} role={message.role} />
        }
        return <YamlMessage content={message.content} />
      case 'suggestions':
        if (messageRenderer?.suggestions) {
          return (
            <messageRenderer.suggestions
              message={message}
              addTextToInput={text => setUserInput(text)}
              sendMessage={text => {
                if (loading && abortController) {
                  abortController.abort()
                }

                handleSubmit(text)
              }}
            />
          )
        }
        return (
          <SuggestionsMessage content={message.content} handleClick={suggestion => setUserInput(suggestion.text)} />
        )
      case 'card':
        if (messageRenderer?.card) {
          return <messageRenderer.card message={message} />
        }
        return <Card content={message.content} />
      case 'error':
        if (messageRenderer?.error) {
          return <messageRenderer.error message={message} />
        }
        return <Error content={message.content} />
      default:
        return <div>Unsupported message type</div>
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
              type: msg.type,
              content: msg.content
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
        setAbortController(null)
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
    <Layout.Vertical className={css.container}>
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
    </Layout.Vertical>
  )
})
