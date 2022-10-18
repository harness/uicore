/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { CSSProperties, FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import cx from 'classnames'
import rafSchd from 'raf-schd'
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
  className?: string
  contentClassName?: string
  testId?: string
}

export const ScrollContainer: FC<ScrollContainerProps> = props => {
  const {
    children,
    className,
    contentClassName,
    testId,
    height = '100%',
    showBottomShadow = true,
    showTopShadow = true
  } = props
  const [scrollShadows, setScrollShadows] = useState({ top: false, bottom: false })
  const scrollableRef = useRef<HTMLDivElement>(null)
  const resizeObserverRef = useRef<ResizeObserver>()

  const setShadows = useCallback(
    rafSchd(() => {
      const target = scrollableRef.current

      if (!target) return

      const { clientHeight, scrollHeight, scrollTop } = target
      const hasScrollableContent = scrollHeight > clientHeight

      if (!hasScrollableContent) return setScrollShadows({ top: false, bottom: false })

      const isTop = scrollTop === 0
      const isBetween = scrollTop > 0 && scrollTop < scrollHeight - clientHeight
      const isBottom = scrollTop === scrollHeight - clientHeight

      if (isTop) {
        setScrollShadows({ top: false, bottom: true })
      } else if (isBetween) {
        setScrollShadows({ top: true, bottom: true })
      } else if (isBottom) {
        setScrollShadows({ top: true, bottom: false })
      }
    }),
    []
  )

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.addEventListener('scroll', setShadows)

      resizeObserverRef.current = new ResizeObserver(() => {
        setShadows()
      })
      resizeObserverRef.current.observe(scrollableRef.current)
    }

    return () => {
      scrollableRef.current?.removeEventListener('scroll', setShadows)
      resizeObserverRef.current?.disconnect()
    }
  }, [setShadows])

  useLayoutEffect(() => {
    setShadows()
  }, [children, setShadows])

  const shadowClassName = useMemo(() => {
    const { top, bottom } = scrollShadows

    if (top && bottom && showTopShadow && showBottomShadow) return css.shadowTopAndBottom
    if (top && showTopShadow) return css.shadowTop
    if (bottom && showBottomShadow) return css.shadowBottom

    return undefined
  }, [scrollShadows])

  return (
    <div className={cx(css.container, shadowClassName, className)} style={{ height }} data-testid={testId}>
      <div ref={scrollableRef} className={cx(css.content, contentClassName)}>
        {children}
      </div>
    </div>
  )
}
