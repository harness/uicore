/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes, useCallback, useMemo, useRef, useState } from 'react'
import { StyledProps, omitStyledProps, styledClasses } from '@harness/design-system'
import { styledClass } from '@harness/design-system'
import { isFunction } from 'lodash-es'
import css from './ScrollShadowContainer.module.css'
import cx from 'classnames'

export interface ScrollShadowContainerProps extends HTMLAttributes<HTMLDivElement>, StyledProps {
  tag?: keyof JSX.IntrinsicElements
  shadowTopClassname?: string
  shadowBottomClassname?: string
  shadowTopAndBottomClassname?: string
  bodyClassname?: string
  bodyContentClassname?: string
}

function ScrollShadowContainer(props: ScrollShadowContainerProps): JSX.Element {
  const {
    tag = 'div',
    children,
    shadowTopClassname = css.shadowTop,
    shadowBottomClassname = css.shadowBottom,
    shadowTopAndBottomClassname = css.shadowTopAndBottom
  } = props
  const Tag = tag as React.ElementType

  const bodyRef = useRef<HTMLDivElement | null>(null)
  const bodyTopEdgeRef = useRef<HTMLDivElement>(null)
  const bodyBottomEdgeRef = useRef<HTMLDivElement>(null)
  const bodyObserverRef = useRef<IntersectionObserver>()

  const [scrollShadows, setScrollShadows] = useState({ top: false, bottom: false })

  const observeEdge = (element: HTMLDivElement | null | undefined, observer: IntersectionObserver): void => {
    if (!element || !observer) return
    observer.observe(element)
  }

  const initScrollShadows = useCallback(() => {
    if (!bodyRef.current) return

    isFunction(bodyObserverRef.current?.disconnect) && bodyObserverRef.current?.disconnect()
    bodyObserverRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const position = (entry.target as HTMLDivElement).dataset.position
          if (typeof position === 'string') {
            setScrollShadows(prev => ({ ...prev, [position]: !entry.isIntersecting }))
          }
        })
      },
      {
        root: bodyRef.current
      }
    )

    observeEdge(bodyTopEdgeRef.current, bodyObserverRef.current)
    observeEdge(bodyBottomEdgeRef.current, bodyObserverRef.current)
  }, [])

  const bodyRefCallback = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) {
        return isFunction(bodyObserverRef.current?.disconnect) && bodyObserverRef.current?.disconnect()
      }
      bodyRef.current = el
      initScrollShadows()
    },
    [initScrollShadows]
  )

  const bodyShadowClass = useMemo(() => {
    const { top, bottom } = scrollShadows

    if (top && bottom) {
      return shadowTopAndBottomClassname
    }
    if (top) {
      return shadowTopClassname
    }
    if (bottom) {
      return shadowBottomClassname
    }
    return ''
  }, [scrollShadows])

  return (
    <Tag
      {...omitStyledProps(props)}
      className={cx(styledClasses(props, styledClass.font), bodyShadowClass, css.body, props.bodyClassname)}
      ref={bodyRefCallback}>
      <div className={cx(css.bodyContent, props.bodyContentClassname)}>
        <div ref={bodyTopEdgeRef} data-position="top" />
        {children}
        <div ref={bodyBottomEdgeRef} data-position="bottom" />
      </div>
    </Tag>
  )
}

ScrollShadowContainer.displayName = 'ScrollShadowContainer'

export { ScrollShadowContainer }
