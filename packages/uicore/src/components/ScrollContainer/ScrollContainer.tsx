/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cx from 'classnames'
import css from './ScrollContainer.css'

export interface ScrollContainerProps {
  /**
   * `true`: renders top shadow when required.
   *
   * `false`: never renders top shadow.
   *
   * default: `true` */
  showTopShadow?: boolean
  /**
   * `true`: renders bottom shadow when required
   *
   * `false`: never renders bottom shadow
   *
   * default: `true` */
  showBottomShadow?: boolean
  /**
   * height of the container
   *
   * default: `100%` */
  height?: CSSProperties['height']
  containerClassName?: string
  overflowWrapperClassName?: string
  testId?: string
}

export const ScrollContainer: FC<ScrollContainerProps> = props => {
  const {
    children,
    containerClassName,
    overflowWrapperClassName,
    testId,
    height = '100%',
    showBottomShadow = true,
    showTopShadow = true
  } = props
  const observerRef = useRef<IntersectionObserver>()
  const [scrollShadows, setScrollShadows] = useState({ top: false, bottom: false })

  const handleContainerRef = useCallback((container: HTMLDivElement | null) => {
    observerRef.current?.disconnect()

    if (!container) return

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const position = (entry.target as HTMLDivElement).dataset.position
          if (typeof position === 'string') {
            setScrollShadows(prev => ({ ...prev, [position]: !entry.isIntersecting }))
          }
        })
      },
      {
        root: container
      }
    )

    container.querySelectorAll('[data-sentinel]').forEach(edge => {
      observerRef.current?.observe(edge)
    })
  }, [])

  // disconnect observer on unmount
  useEffect(() => () => observerRef.current?.disconnect(), [])

  const shadowClassName = useMemo(() => {
    const { top, bottom } = scrollShadows

    if (top && bottom && showTopShadow && showBottomShadow) return css.shadowTopAndBottom
    if (top && showTopShadow) return css.shadowTop
    if (bottom && showBottomShadow) return css.shadowBottom

    return undefined
  }, [scrollShadows])

  return (
    <div
      className={cx(css.container, shadowClassName, containerClassName)}
      style={{ height }}
      ref={handleContainerRef}
      data-testid={testId}>
      <div className={cx(css.overflowWrapper, overflowWrapperClassName)}>
        <div data-sentinel data-position="top" />
        {children}
        <div data-sentinel data-position="bottom" />
      </div>
    </div>
  )
}
