/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { TypingAnimation } from '../TypingAnimation'

describe('TypingAnimation component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders without crashing', () => {
    const { container } = render(<TypingAnimation text="Test text" data-testid="typing-animation" />)
    expect(container).toBeInTheDocument()
    expect(screen.getByTestId('typing-animation')).toBeInTheDocument()
  })

  test('displays empty text initially', () => {
    render(<TypingAnimation text="Test text" data-testid="typing-animation" />)
    const element = screen.getByTestId('typing-animation')
    expect(element.textContent).toBe('')
  })

  test('types out the full text after animation completes', () => {
    const testText = 'Test text'
    render(<TypingAnimation text={testText} data-testid="typing-animation" />)

    act(() => {
      jest.advanceTimersByTime(10)
    })

    for (let i = 0; i < testText.length; i++) {
      act(() => {
        jest.advanceTimersByTime(50)
      })
    }

    act(() => {
      jest.advanceTimersByTime(100)
    })

    const element = screen.getByTestId('typing-animation')
    expect(element.textContent).toBe(testText)
  })

  test('respects the delay before starting to type', () => {
    const testText = 'Test text'
    const delay = 1000
    render(<TypingAnimation text={testText} delay={delay} data-testid="typing-animation" />)

    const element = screen.getByTestId('typing-animation')
    expect(element.textContent).toBe('')

    act(() => {
      jest.advanceTimersByTime(delay + 10)
    })

    act(() => {
      jest.advanceTimersByTime(50)
    })

    expect(element.textContent?.length).toBeGreaterThan(0)
    expect(element.textContent?.length).toBeLessThan(testText.length)

    for (let i = 1; i < testText.length; i++) {
      act(() => {
        jest.advanceTimersByTime(50)
      })
    }

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(element.textContent).toBe(testText)
  })

  test('respects custom typing speed', () => {
    const testText = 'Test text'
    const typingSpeed = 100
    render(<TypingAnimation text={testText} typingSpeed={typingSpeed} data-testid="typing-animation" />)

    act(() => {
      jest.advanceTimersByTime(10)
    })

    const halfLength = Math.floor(testText.length / 2)
    for (let i = 0; i < halfLength; i++) {
      act(() => {
        jest.advanceTimersByTime(typingSpeed)
      })
    }

    const element = screen.getByTestId('typing-animation')
    expect(element.textContent?.length).toBeGreaterThan(0)
    expect(element.textContent?.length).toBeLessThan(testText.length)

    for (let i = halfLength; i < testText.length; i++) {
      act(() => {
        jest.advanceTimersByTime(typingSpeed)
      })
    }

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(element.textContent).toBe(testText)
  })

  test('passes additional props to Text component', () => {
    render(<TypingAnimation text="Test text" data-testid="typing-animation" />)
    expect(screen.getByTestId('typing-animation')).toBeInTheDocument()
  })

  test('only animates once even when component rerenders', () => {
    const testText = 'Test text'
    const { rerender } = render(<TypingAnimation text={testText} data-testid="typing-animation" />)

    act(() => {
      jest.advanceTimersByTime(10)
    })

    for (let i = 0; i < testText.length; i++) {
      act(() => {
        jest.advanceTimersByTime(50)
      })
    }

    act(() => {
      jest.advanceTimersByTime(100)
    })

    const element = screen.getByTestId('typing-animation')
    expect(element.textContent).toBe(testText)

    rerender(<TypingAnimation text={testText} data-testid="typing-animation" />)
    expect(element.textContent).toBe(testText)
  })
})
