/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { FC, ReactNode, useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { Dialog, IDialogProps, Spinner } from '@blueprintjs/core'
import cx from 'classnames'
import { isFunction } from 'lodash-es'
import { FontVariation } from '@harness/design-system'
import { Heading } from '../Heading/Heading'
import { Button, ButtonVariation } from '../Button/Button'

import css from './ModalDialog.css'

const observeEdge = (element: HTMLDivElement | null | undefined, observer: IntersectionObserver) => {
  if (!element || !observer) return
  observer.observe(element)
}

export interface ModalDialogProps extends IDialogProps {
  /**
   * Optional title of the modal. Can be a string or anything that React can render.
   * Content will be rendered within a `<h3>` tag with appropriate styling.
   */
  title?: ReactNode
  /**
   * Optional footer of the modal. Can be anything that React can render, but recommended
   * to use a `<Layout.Horizontal>` component with `spacing="small"`.
   */
  footer?: ReactNode
  /**
   * Optional toolbar of the modal. Can be anything that React can render, but recommended
   * to use a `<Layout.Horizontal>` component with `spacing="small"`.
   */
  toolbar?: ReactNode
  /**
   * Optional override of the width of the modal. If the viewport width is too small,
   * the max width of the modal will be the width of the viewport less margin. If no `width`
   * is provided, the modal will default to `500px` wide.
   */
  width?: number
  /**
   * Optional override of the height of the modal. If the viewport height is too small,
   * the max height of the modal will be the height of the viewport less margin. If no `height`
   * is provided, the modal will grow with its content to a max height of `680px`.
   */
  height?: number
  /**
   * Optional override of the accessible label of the close button of the modal. Defaults to "Close"
   */
  closeButtonLabel?: string
  /**
   * Optional: when set to true an overlay is shown over the entire modal
   */
  showOverlay?: boolean
}

export const ModalDialog: FC<ModalDialogProps> = ({
  title,
  footer,
  toolbar,
  width,
  height,
  children,
  className = '',
  closeButtonLabel = 'Close',
  isCloseButtonShown = true,
  showOverlay = false,
  style = {},
  onClose,
  ...dialogProps
}) => {
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const bodyTopEdgeRef = useRef<HTMLDivElement>(null)
  const bodyBottomEdgeRef = useRef<HTMLDivElement>(null)
  const bodyObserverRef = useRef<IntersectionObserver>()

  const [scrollShadows, setScrollShadows] = useState({ top: false, bottom: false })

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

  useEffect(() => bodyObserverRef.current?.disconnect, [])

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

  const modifiers = []

  if (!title) {
    modifiers.push(css.noHeader)
  }
  if (!toolbar) {
    modifiers.push(css.noToolbar)
  }
  if (!footer) {
    modifiers.push(css.noFooter)
  }

  if (width) {
    style.width = `${width}px`
  }
  if (height) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    style['--ModalDialog-Height'] = `${height}px`
  }

  const bodyShadowClass = useMemo(() => {
    const { top, bottom } = scrollShadows

    if (top && bottom && (title || toolbar) && footer) return css.shadowTopAndBottom
    if (top && (title || toolbar)) return css.shadowTop
    if (bottom && footer) return css.shadowBottom
    return ''
  }, [scrollShadows])

  const modalContent = (
    <>
      {title && (
        <header className={css.header} data-testid="modaldialog-header">
          <Heading level={3} font={{ variation: FontVariation.H3 }}>
            {title}
          </Heading>
        </header>
      )}
      {toolbar && (
        <aside className={css.toolbar} data-testid="modaldialog-toolbar">
          {toolbar}
        </aside>
      )}

      <div className={cx(css.body, bodyShadowClass)} data-testid="modaldialog-body" ref={bodyRefCallback}>
        <div className={css.bodyContent}>
          <div ref={bodyTopEdgeRef} data-position="top" />
          <div>{children}</div>
          <div ref={bodyBottomEdgeRef} data-position="bottom" />
        </div>
      </div>

      {footer && (
        <footer className={css.footer} data-testid="modaldialog-footer">
          {footer}
        </footer>
      )}

      {onClose && isCloseButtonShown && (
        <Button
          aria-label={closeButtonLabel}
          icon="Stroke"
          intent="primary"
          variation={ButtonVariation.ICON}
          onClick={() => onClose()}
          className={css.closeButton}
        />
      )}
    </>
  )

  return (
    <Dialog
      onClose={onClose}
      autoFocus
      enforceFocus
      canEscapeKeyClose
      canOutsideClickClose
      usePortal
      className={cx(className, css.container, ...modifiers)}
      style={style}
      {...dialogProps}>
      {modalContent}
      {showOverlay && (
        <div className={css.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </Dialog>
  )
}
