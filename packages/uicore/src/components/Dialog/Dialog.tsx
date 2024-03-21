/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import cx from 'classnames'
import { Container } from '../..'
import { Icon } from '@harnessio/icons'
import { Dialog as BluePrintDialog, IDialogProps } from '@blueprintjs/core'
import css from './Dialog.css'

export interface DialogProps extends IDialogProps {
  footer?: JSX.Element | JSX.Element[]
  children?: JSX.Element | JSX.Element[]
  chidrenClassName?: string
}

const defaultProps = {
  usePortal: true,
  autoFocus: true,
  enforceFocus: false,
  canOutsideClickClose: true,
  canEscapeKeyClose: true
}

export function Dialog(props: DialogProps): React.ReactElement {
  return (
    <BluePrintDialog
      {...defaultProps}
      {...props}
      className={cx(css.dialog, props.className)}
      isCloseButtonShown={false}>
      <Icon name="Stroke" size={15} onClick={props.onClose} className={css.close} />
      <Container padding="none" className={cx(css.children, props.chidrenClassName)}>
        {props.children}
      </Container>
      <footer>{props.footer}</footer>
    </BluePrintDialog>
  )
}
