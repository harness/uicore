/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useEffect, useRef } from 'react'
import { Text, TextProps } from '../Text/Text'

interface TypingAnimationProps extends TextProps {
  text: string
  typingSpeed?: number
  delay?: number
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, typingSpeed = 50, delay = 0, ...rest }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    // Only run the animation once
    if (hasAnimatedRef.current) {
      setDisplayText(text)
      return
    }

    // Reset animation when text changes
    setDisplayText('')
    setCurrentIndex(0)
    setIsTyping(false)

    // Start typing after delay
    const delayTimer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else if (currentIndex === text.length) {
      // Mark as animated once complete
      hasAnimatedRef.current = true
    }
  }, [currentIndex, isTyping, text, typingSpeed])

  return <Text {...rest}>{displayText}</Text>
}
