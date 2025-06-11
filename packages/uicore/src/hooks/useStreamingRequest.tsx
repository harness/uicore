/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useCallback, useRef, useState } from 'react'

export type StreamEventHandler = (
  eventType: string,
  data: unknown,
  dataLine: string
) => {
  shouldStopReading?: boolean
}

export interface StreamingRequestOptions<T = Record<string, unknown>> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: T
  params?: Record<string, string | undefined>
  onEvent: StreamEventHandler
  onComplete?: () => void
  onError?: (error: Error) => void
}

export interface StreamingRequestHook<T = Record<string, unknown>> {
  isStreaming: boolean
  startStream: (options: StreamingRequestOptions<T>) => void
  stopStream: () => void
}

export function useStreamingRequest<T = Record<string, unknown>>(): StreamingRequestHook<T> {
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsStreaming(false)
  }, [])

  const buildUrlWithParams = (baseUrl: string, params?: StreamingRequestOptions['params']): string => {
    if (!params) return baseUrl

    const addParamsToUrl = (url: URL) => {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, value)
        }
      })
      return url
    }

    try {
      const url = addParamsToUrl(new URL(baseUrl))
      return url.toString()
    } catch (e) {
      const url = addParamsToUrl(new URL(baseUrl, window.location.origin))
      return url.pathname + url.search
    }
  }

  const startStream = useCallback(
    async (options: StreamingRequestOptions<T>) => {
      stopStream()

      const { url, method = 'POST', headers = {}, body, params = {}, onEvent, onComplete, onError } = options

      if (!url) {
        if (onError) onError(new Error('URL is required'))
        return
      }

      abortControllerRef.current = new AbortController()
      const abortSignal = abortControllerRef.current?.signal

      setIsStreaming(true)

      const fullUrl = buildUrlWithParams(url, params)

      try {
        const response = await fetch(fullUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: abortSignal
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const contentType = response.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
          const jsonData = await response.json()
          onEvent('json', jsonData, JSON.stringify(jsonData))
          if (isMountedRef.current) {
            onComplete?.()
            setIsStreaming(false)
          }
          return
        }

        if (!response.body) {
          throw new Error('Response body is null')
        }

        const reader = response.body.getReader()

        const parseDataLine = (dataLine: string): unknown => {
          try {
            if (dataLine.startsWith('"') && dataLine.endsWith('"')) {
              dataLine = dataLine.substring(1, dataLine.length - 1)
            }
            return JSON.parse(dataLine)
          } catch {
            return {}
          }
        }

        const processStream = async (): Promise<void> => {
          try {
            let reading = true
            const decoder = new TextDecoder()
            let buffer = ''

            while (reading) {
              // eslint-disable-next-line no-await-in-loop
              const { done, value } = await reader.read()

              if (done) {
                reading = false
                break
              }

              const chunk = decoder.decode(value, { stream: true })
              buffer += chunk

              const events = buffer.split('\n\n')
              buffer = events.pop() || ''

              for (const eventText of events) {
                if (!isMountedRef.current) break
                if (!eventText.trim() || eventText.startsWith(':')) continue

                const eventLines = eventText.split('\n')
                let eventType = ''
                let dataLine = ''
                let dataObj: unknown = null

                for (const line of eventLines) {
                  if (line.startsWith('event:')) {
                    eventType = line.substring(6).trim()
                  } else if (line.startsWith('data:')) {
                    dataLine = line.substring(5).trim()
                    dataObj = parseDataLine(dataLine)
                  }
                }

                if (eventType) {
                  const { shouldStopReading } = onEvent(eventType, dataObj, dataLine)
                  if (shouldStopReading) {
                    reading = false
                    break
                  }
                } else if (eventText.includes(': ping')) {
                  onEvent('ping', null, '')
                }
              }
            }

            if (isMountedRef.current) {
              onComplete?.()
              setIsStreaming(false)
            }
          } catch (error) {
            if (isMountedRef.current && error instanceof Error && error.name !== 'AbortError') {
              onError?.(error)
              setIsStreaming(false)
            }
          }
        }

        processStream()
      } catch (error) {
        if (isMountedRef.current && error instanceof Error) {
          onError?.(error)
          setIsStreaming(false)
        }
      }
    },
    [stopStream]
  )

  return {
    isStreaming,
    startStream,
    stopStream
  }
}
