import React, { ChangeEvent, useCallback, useEffect, useState, useRef } from 'react'
import { Color } from '@harness/design-system'
import { Button, ButtonVariation, Container, Layout } from '../..'
import type * as CSS from 'csstype'
import { debounce } from 'lodash-es'
import classnames from 'classnames'
import css from './MinMaxSlider.css'

export interface MinMaxAngleState {
  min: number
  max: number
}

export interface MultiRangeSliderProps {
  min: number
  max: number
  step?: number
  width?: CSS.Properties['width']
  debounceDuration?: number
  unitSuffixString?: string
  onChange: (value: MinMaxAngleState) => void
}

export const MinMaxSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  step = 1,
  width = '100%',
  debounceDuration = 300,
  unitSuffixString = '',
  onChange
}) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef<HTMLInputElement>(null)
  const maxValRef = useRef<HTMLInputElement>(null)
  const maxValNumberRef = useRef<HTMLInputElement>(null)
  const minValNumberRef = useRef<HTMLInputElement>(null)
  const range = useRef<HTMLDivElement>(null)

  const displayValueSuffix = unitSuffixString.trim()

  const isMounted = useRef(false)

  // Convert to percentage
  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max])

  const handleReset = useCallback(() => {
    setMinVal(min)
    setMaxVal(max)
  }, [min, max])

  const delayedOnChange = useCallback(
    debounce((updatedAngle: MinMaxAngleState) => onChange(updatedAngle), debounceDuration),
    [onChange]
  )

  const handleMaxChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(+event.target.value, minVal + 1)
      setMaxVal(value)
      event.target.value = value.toString()
    },
    [setMaxVal, minVal]
  )

  const handleMinChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(+event.target.value, maxVal - 1)
      setMinVal(value)
      event.target.value = value.toString()
    },
    [setMinVal, maxVal]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value) // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }

      if (minValNumberRef.current) {
        minValNumberRef.current.style.left = `calc(${minPercent}% - 5px)`
      }
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`
      }

      if (maxValNumberRef.current) {
        maxValNumberRef.current.style.right = `calc(${Math.abs(maxPercent - 100)}% - 10px)`
      }
    }
  }, [maxVal, getPercent])

  // Get min and max values when their state changes
  useEffect(() => {
    // To prevent calling onChange during mount
    if (isMounted.current) {
      delayedOnChange({ min: minVal, max: maxVal })
    } else {
      isMounted.current = true
    }
  }, [minVal, maxVal, delayedOnChange])

  return (
    <Layout.Vertical style={{ alignItems: 'center', position: 'relative' }}>
      <Container
        data-testid="minMaxSlider_container"
        flex
        style={{ justifyContent: 'center', width }}
        margin={{ top: 'huge' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          data-testid="MinMaxSlider_MinInput"
          value={minVal}
          ref={minValRef}
          onChange={handleMinChangeValue}
          style={{ width }}
          className={classnames(css.thumb, css['thumbZindex-3'], {
            [css['thumbZindex-5']]: minVal > max - 100
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          data-testid="MinMaxSlider_MaxInput"
          value={maxVal}
          ref={maxValRef}
          onChange={handleMaxChangeValue}
          style={{ width }}
          className={classnames(css.thumb, css['thumbZindex-5'])}
        />

        <Container className={css.slider} style={{ width: '100%' }}>
          <div className={css['slider__track']} style={{ width }}></div>
          <div ref={range} data-testid="MinMaxSlider_Range" className={css['slider__range']}></div>
          <p ref={minValNumberRef} data-testid="MinMaxSlider_MinValue" className={css['slider__left-value']}>
            {minVal}
            {displayValueSuffix}
          </p>
          <p ref={maxValNumberRef} data-testid="MinMaxSlider_MaxValue" className={css['slider__right-value']}>
            {maxVal}
            {displayValueSuffix}
          </p>
        </Container>
      </Container>
      <Container>
        <Button
          className={css.resetButton}
          variation={ButtonVariation.LINK}
          onClick={handleReset}
          inline
          icon="reset"
          iconProps={{ margin: { right: 'small' } }}
          color={Color.PRIMARY_7}
          data-testid="MinMaxSlider_reset">
          Reset
        </Button>
      </Container>
    </Layout.Vertical>
  )
}
