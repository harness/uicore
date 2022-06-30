/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './Carousel.css'
import cx from 'classnames'
import { Layout } from '../../layouts/Layout'
import { Icon } from '@harness/icons'

export interface CarouselProps {
  className?: string
  defaultSlide?: number // 1
  nextElement?: JSX.Element
  previousElement?: JSX.Element
  hideIndicators?: boolean // false
  onChange?: (slideNumber: number) => void
  children: Array<React.ReactElement<HTMLElement>> | React.ReactElement<HTMLElement>
}

export const Carousel: React.FC<CarouselProps> = ({
  className = '',
  children,
  defaultSlide = 1,
  nextElement,
  previousElement,
  hideIndicators = false,
  onChange
}) => {
  const [totalSlides, setTotalSlides] = React.useState(1)
  const [activeSlide, setActiveSlide] = React.useState(1)

  React.useEffect(() => {
    let slides = 1
    if (Array.isArray(children)) {
      slides = children.length
    }
    setTotalSlides(slides)
  }, [children])

  React.useEffect(() => {
    setActiveSlide(defaultSlide)
  }, [defaultSlide])

  React.useEffect(() => {
    onChange?.(activeSlide)
  }, [activeSlide])

  const indicators = [...Array(totalSlides)].map((_ar, index) => (
    <span
      key={index}
      className={cx(css.indicator, { [css.active]: activeSlide === index + 1 })}
      onClick={() => setActiveSlide(index + 1)}
    />
  ))

  const items = [...Array(totalSlides)].map((_ar, index) => (
    <div
      key={index}
      className={cx(
        css.carouselItem,
        { [css.carouselItemPrev]: activeSlide === index + 2 },
        { [css.active]: activeSlide === index + 1 },
        { [css.carouselItemNext]: activeSlide === index }
      )}>
      {Array.isArray(children) ? children[index] : children}
    </div>
  ))

  return (
    <Layout.Vertical spacing="xsmall" padding="small" className={cx(css.carousel, className)}>
      <div className={css.carouselView}>
        {!previousElement ? (
          activeSlide > 1 && (
            <div className={css.carouselLeft} onClick={() => setActiveSlide(activeSlide - 1)}>
              <div>
                <Icon name="main-chevron-left" size={20} color="white" />
              </div>
            </div>
          )
        ) : (
          <span onClick={() => setActiveSlide(activeSlide - 1)}>{previousElement} </span>
        )}
        {items}
        {!nextElement ? (
          activeSlide < totalSlides && (
            <div className={css.carouselRight} onClick={() => setActiveSlide(activeSlide + 1)}>
              <div>
                <Icon name="main-chevron-right" size={20} color="white" />
              </div>
            </div>
          )
        ) : (
          <span onClick={() => setActiveSlide(activeSlide + 1)}>{nextElement} </span>
        )}
      </div>
      {!hideIndicators && <div className={css.carouselIndicators}>{indicators}</div>}
    </Layout.Vertical>
  )
}
