/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { renderHook, act } from '@testing-library/react-hooks'
import { useStreamingRequest } from './useStreamingRequest'

// Mock global fetch
global.fetch = jest.fn()
const mockFetch = global.fetch as jest.Mock

// Mock AbortController
global.AbortController = jest.fn().mockImplementation(() => ({
  abort: jest.fn(),
  signal: {}
}))

// Mock URL
class MockURL {
  pathname: string
  search: string
  searchParams: { set: (key: string, value: string) => void }
  origin: string

  constructor(url: string, base?: string) {
    // Handle relative URLs with base
    if (base && !url.startsWith('http')) {
      this.origin = base
      this.pathname = url
    } else {
      this.origin = 'https://example.com'
      this.pathname = url
    }

    this.search = ''
    this.searchParams = {
      set: (key: string, value: string) => {
        if (!this.search) {
          this.search = `?${key}=${value}`
        } else {
          this.search += `&${key}=${value}`
        }
      }
    }
  }

  toString(): string {
    return this.origin + this.pathname + this.search
  }
}

global.URL = MockURL as any

// Mock TextDecoder
global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn(value => (value ? value.toString() : ''))
}))

// Mock TextEncoder if not available
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = jest.fn().mockImplementation(() => ({
    encode: jest.fn(text => Buffer.from(text))
  }))
}

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'https://example.com'
  },
  writable: true
})

// Mock stream reader
const mockReader = {
  read: jest.fn()
}

// Mock response body
const mockBody = {
  getReader: jest.fn().mockReturnValue(mockReader)
}

describe('useStreamingRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockReset()
  })

  test('should initialize with isStreaming=false', () => {
    const { result } = renderHook(() => useStreamingRequest())

    expect(result.current.isStreaming).toBe(false)
    expect(typeof result.current.startStream).toBe('function')
    expect(typeof result.current.stopStream).toBe('function')
  })

  test('should set isStreaming=true when startStream is called', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        body: { query: 'test' },
        onEvent: jest.fn()
      })
    })

    expect(result.current.isStreaming).toBe(true)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  test('should handle absolute URLs correctly', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: 'https://api.example.com/stream',
        params: { param1: 'value1', param2: 'value2' },
        onEvent: jest.fn()
      })
    })

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.example.com/stream'),
      expect.objectContaining({
        method: 'POST'
      })
    )
  })

  test('should handle relative URLs correctly', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        params: { param1: 'value1' },
        onEvent: jest.fn()
      })
    })

    expect(mockFetch).toHaveBeenCalled()
    const fetchUrl = mockFetch.mock.calls[0][0]
    expect(fetchUrl).toContain('/api/stream')
    expect(fetchUrl).toContain('param1=value1')
  })

  test('should call onError when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const onError = jest.fn()
    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        onEvent: jest.fn(),
        onError
      })
    })

    // Wait for promises to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Network error'
      })
    )
    expect(result.current.isStreaming).toBe(false)
  })

  test('should call onError when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    const onError = jest.fn()
    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        onEvent: jest.fn(),
        onError
      })
    })

    // Wait for promises to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Server responded with status: 404'
      })
    )
    expect(result.current.isStreaming).toBe(false)
  })

  test('should process SSE events correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    // Simulate an SSE event
    // Use a Buffer directly to avoid TextEncoder issues
    mockReader.read
      .mockResolvedValueOnce({
        done: false,
        value: Buffer.from('event: test_event\ndata: {"message":"Hello"}\n\n')
      })
      .mockResolvedValueOnce({
        done: true,
        value: undefined
      })

    const onEvent = jest.fn(() => ({ shouldStopReading: false }))
    const onComplete = jest.fn()

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        onEvent,
        onComplete
      })
    })

    // Wait for promises to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(onEvent).toHaveBeenCalledWith(
      'test_event',
      expect.objectContaining({ message: 'Hello' }),
      expect.any(String)
    )
    expect(onComplete).toHaveBeenCalled()
    expect(result.current.isStreaming).toBe(false)
  })

  test('should handle multiple events in a single chunk', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    // Simulate multiple SSE events in one chunk
    // Use a Buffer directly to avoid TextEncoder issues
    mockReader.read
      .mockResolvedValueOnce({
        done: false,
        value: Buffer.from('event: event1\ndata: {"value":1}\n\nevent: event2\ndata: {"value":2}\n\n')
      })
      .mockResolvedValueOnce({
        done: true,
        value: undefined
      })

    const onEvent = jest.fn(() => ({ shouldStopReading: false }))

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        onEvent
      })
    })

    // Wait for promises to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(onEvent).toHaveBeenCalledTimes(2)
    expect(onEvent).toHaveBeenNthCalledWith(1, 'event1', expect.objectContaining({ value: 1 }), expect.any(String))
    expect(onEvent).toHaveBeenNthCalledWith(2, 'event2', expect.objectContaining({ value: 2 }), expect.any(String))
  })

  test('should stop streaming when shouldStopReading is true', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    mockReader.read.mockResolvedValueOnce({
      done: false,
      value: Buffer.from('event: test_event\ndata: {"message":"Hello"}\n\n')
    })

    const onEvent = jest.fn(() => ({ shouldStopReading: true }))
    const onComplete = jest.fn()

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        onEvent,
        onComplete
      })
    })

    // Wait for promises to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(onEvent).toHaveBeenCalled()
    expect(onComplete).toHaveBeenCalled()
    expect(result.current.isStreaming).toBe(false)
  })

  test('should stop streaming when stopStream is called', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    const { result } = renderHook(() => useStreamingRequest())

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        onEvent: jest.fn()
      })
    })

    expect(result.current.isStreaming).toBe(true)

    act(() => {
      result.current.stopStream()
    })

    expect(result.current.isStreaming).toBe(false)
  })

  test('should support generic type parameters', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: mockBody
    })

    interface TestRequest {
      query: string
      filters: string[]
    }

    const { result } = renderHook(() => useStreamingRequest<TestRequest>())

    const requestBody: TestRequest = {
      query: 'test query',
      filters: ['filter1', 'filter2']
    }

    act(() => {
      result.current.startStream({
        url: '/api/stream',
        body: requestBody,
        onEvent: jest.fn()
      })
    })

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify(requestBody)
      })
    )
  })
})
