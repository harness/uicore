import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'

import { Icon } from '../../icons/Icon'
import { Button } from '../Button/Button'

import css from './ExpandingSearchInput.css'

const DEFAULT_THROTTLE = 500 // ms

/**
 * Features:
 *   - Search throttling  (so it doesn't call "props.onChange" many times when user types so fast)
 *   - defaultValue       (e.g. remember last search text when get to the page)
 *   - autoFocus initially
 */

export interface PropsInterface {
  name?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (text: string) => void
  onEnter?: (text: string, reverse?: boolean) => void
  onPrev?: (text: string) => void
  onNext?: (text: string) => void
  autoFocus?: boolean // auto focus (caret) initially
  className?: string
  throttle?: number
  showPrevNextButtons?: boolean
  fixedText?: string
  flip?: boolean
}

export function ExpandingSearchInput(props: PropsInterface) {
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
    flip
  } = props

  const [key, setKey] = useState(Math.random())
  const [value, setValue] = useState('')
  const [isDefaultSet, setIsDefaultSet] = useState(false)
  const [inputNoTransition, setInputNoTransition] = useState(false)

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
      if (event.key === 'Enter') {
        if (!event.shiftKey) {
          onEnter?.(event.currentTarget.value, false)
        } else {
          onEnter?.(event.currentTarget.value, true)
        }
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

  const cssMain = `bp3-input-group ui-search-box ${css.main} ${className} ${flip ? css.flip : ''}`

  const cssInput = `bp3-input ${inputNoTransition ? css.notransition : ''}`

  const cssIcon = `${css.icon} ${flip ? css.flipicon : ''}`

  const cssBtnWrapper = `${css.btnWrapper} ${flip ? css.flipBtnWrapper : ''} `

  const cssFixedText = `${css.fixedText} ${flip ? css.flipFixedText : ''}`

  // needs to be the last useEffect
  // using ref instead of state variable to avoid triggering a rerender
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    }
  })

  return (
    <div key={key} className={cssMain} data-name={name}>
      <Icon name="search" className={cssIcon} size={14} />
      <input
        ref={inputRef}
        className={cssInput}
        type="search"
        placeholder={placeholder}
        dir="auto"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      {value.length > 0 ? (
        <>
          {fixedText ? <span className={cssFixedText}>{fixedText}</span> : null}

          <span className={cssBtnWrapper}>
            {showPrevNextButtons ? (
              <>
                <Button icon={'arrow-up'} minimal onClick={onPrev} />
                <Button icon={'arrow-down'} minimal onClick={onNext} />
              </>
            ) : null}
            <Button icon={'small-cross'} minimal onClick={onClear} />
          </span>
        </>
      ) : null}
    </div>
  )
}
