/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { FC, ReactNode, useCallback, useRef } from 'react'
import { throttle } from 'lodash-es'
import { Dialog, IDialogProps } from '@blueprintjs/core'
import cx from 'classnames'
import { FontVariation } from '@harness/design-system'
import { Heading } from '../Heading/Heading'
import { Button, ButtonVariation } from '../Button/Button'

import css from './ModalDialog.css'

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
}

export const ModalDialog: FC<ModalDialogProps> = ({
  onOpened = () => undefined,
  title,
  footer,
  toolbar,
  width,
  height,
  children,
  className = '',
  closeButtonLabel = 'Close',
  onClose,
  isCloseButtonShown = true,
  style = {},
  ...dialogProps
}) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  const manageScrollIndicators = throttle(() => {
    const el = bodyRef.current

    if (el) {
      el.style.setProperty('--showScrollTop', el.scrollTop > 0 ? '1' : '0')
      el.style.setProperty('--showScrollBottom', el.scrollTop < el.scrollHeight - el.clientHeight ? '1' : '0')
    }
  }, 100)

  const onModalOpened = useCallback(
    arg => {
      manageScrollIndicators()
      onOpened(arg)
    },
    [manageScrollIndicators, onOpened]
  )

  const modifiers = []

  if (!title && !toolbar) {
    modifiers.push(css.noHeader)
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

  return (
    <Dialog
      onOpened={onModalOpened}
      autoFocus
      enforceFocus
      canEscapeKeyClose
      canOutsideClickClose
      usePortal
      className={cx(className, css.container, ...modifiers)}
      style={style}
      {...dialogProps}>
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

      <div className={css.body} data-testid="modaldialog-body" ref={bodyRef} onScroll={manageScrollIndicators}>
        {children}
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
    </Dialog>
  )
}
