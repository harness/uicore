import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'

import { Icon } from '../../icons/Icon'
import { Button } from '../Button/Button'
import { StyledProps } from '../../styled-props/StyledProps'
import css from './ExpandingSearchInput.css'

const DEFAULT_THROTTLE = 500 // ms

/**
 * Features:
 *   - Search throttling  (so it doesn't call "props.onChange" many times when user types so fast)
 *   - defaultValue       (e.g. remember last search text when get to the page)
 *   - autoFocus initially
 */

export interface ExpandingSearchInputProps {
  name?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (text: string) => void
  onEnter?: (text: string, reverse?: boolean) => void
  onPrev?: (text: string) => void
  onNext?: (text: string) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  autoFocus?: boolean // auto focus (caret) initially
  className?: string
  throttle?: number
  showPrevNextButtons?: boolean
  fixedText?: string
  flip?: boolean
  width?: StyledProps['width']
}

export interface ExpandingSearchInputHandle {
  focus(): void
  clear(): void
}

export function ExpandingSearchInput(
  props: ExpandingSearchInputProps,
  ref?: React.ForwardedRef<ExpandingSearchInputHandle | undefined>
): React.ReactElement {
  const {
    name = '',
    defaultValue,
    placeholder = 'Search',
    onChange: propsOnChange,
    onEnter,
    onPrev: propsOnPrev,
    onNext: propsOnNext,
    autoFocus,
    className = '',
    throttle = DEFAULT_THROTTLE,
    showPrevNextButtons,
    fixedText,
    flip,
    width
  } = props

  const [key, setKey] = useState(Math.random())
  const [value, setValue] = useState('')
  const [isDefaultSet, setIsDefaultSet] = useState(false)
  const [inputNoTransition, setInputNoTransition] = useState(false)
  const [focused, setFocused] = useState<boolean>(false)
  const [onClearFlag, setOnClearFlag] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const mounted = useRef(false)

  // getDerivedStateFromProps
  if (!isDefaultSet && typeof defaultValue === 'string' && defaultValue.length > 0) {
    // only set defaultValue (once) if it has a real string value. (at parent, defaultValue can be set asynchronously)
    if (value === '') {
      setKey(Math.random())
      setValue(defaultValue)
    }
    setIsDefaultSet(true)
  }

  // componentDidMount
  useLayoutEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [])

  // componentWillUnmount
  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current)
    }
  }, [])

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      timerRef.current && clearTimeout(timerRef.current)
      const text = event.target.value
      setValue(text)
      timerRef.current = setTimeout(() => {
        propsOnChange?.(text)
      }, throttle)
    },
    [setValue, propsOnChange, throttle]
  )

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      props.onKeyPress?.(event)

      if (event.key === 'Enter') {
        onEnter?.(event.currentTarget.value, !!event.shiftKey)
      }
    },
    [onEnter]
  )

  const onPrev = useCallback(() => {
    if (inputRef.current?.value) {
      if (propsOnPrev) {
        propsOnPrev(inputRef.current.value)
      } else {
        onEnter?.(inputRef.current.value, true)
      }
    }
  }, [propsOnPrev, onEnter])

  const onNext = useCallback(() => {
    if (inputRef.current?.value) {
      if (propsOnNext) {
        propsOnNext(inputRef.current.value)
      } else {
        onEnter?.(inputRef.current.value, false)
      }
    }
  }, [propsOnNext, onEnter])

  const onClear = useCallback(() => {
    setInputNoTransition(true)
    setKey(Math.random())
    setValue('')
    setOnClearFlag(prevOnClearFlag => !prevOnClearFlag)
  }, [setInputNoTransition, setKey, setValue, setOnClearFlag])
  const afterClear = useCallback(() => {
    if (mounted.current) {
      inputRef.current?.focus()
      propsOnChange?.('')
      setInputNoTransition(false)
    }
  }, [propsOnChange, setInputNoTransition])
  useLayoutEffect(afterClear, [onClearFlag])

  React.useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus()
    },
    clear() {
      onClear()
    }
  }))

  const cssMain = `bp3-input-group ui-search-box ${css.main} ${className} ${flip ? css.flip : ''}`

  const cssInput = `bp3-input ${inputNoTransition ? css.notransition : ''} ${
    showPrevNextButtons ? css.find : css.filter
  }`

  const cssIcon = `${css.icon} ${flip ? css.flipicon : ''}`

  const cssBtnWrapper = `${css.btnWrapper} ${flip ? css.flipBtnWrapper : ''} `

  const padRightAmount =
    (focused ? (flip ? 32 : 0) + 36 : 0) +
    (showPrevNextButtons ? 58 : 0) +
    (fixedText ? (fixedText.length || 0) * 8 : 0)

  // needs to be the last useEffect
  // using ref instead of state variable to avoid triggering a rerender
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    }
  })

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [setFocused])

  const onBlur = useCallback(() => {
    setFocused(false)
  }, [setFocused])

  return (
    <div key={key} className={cssMain} style={{ width }} data-name={name}>
      <Icon name="thinner-search" className={cssIcon} size={14} />
      <input
        ref={inputRef}
        className={cssInput}
        type="search"
        placeholder={placeholder}
        dir="auto"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ paddingRight: `${padRightAmount}px` }}
      />
      {value.length > 0 ? (
        <>
          <span className={cssBtnWrapper}>
            {fixedText ? <span>{fixedText}</span> : null}
            {showPrevNextButtons ? (
              <>
                <Button icon={'main-chevron-up'} iconProps={{ size: 10 }} minimal onClick={onPrev} />
                <Button icon={'main-chevron-down'} iconProps={{ size: 10 }} minimal onClick={onNext} />
              </>
            ) : null}
            <Button icon={'main-close'} iconProps={{ size: 8 }} minimal onClick={onClear} />
          </span>
        </>
      ) : null}
    </div>
  )
}

export const ExpandingSearchInputWithRef = React.forwardRef(ExpandingSearchInput)
