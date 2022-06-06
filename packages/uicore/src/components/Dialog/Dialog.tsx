/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Container, Icon } from '../..'
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
