import React from 'react'
import { Container, Icon } from '../..'
import { Dialog as BluePrintDialog, IDialogProps } from '@blueprintjs/core'
import css from './Dialog.css'

export interface DialogProps extends IDialogProps {
  footer?: JSX.Element | JSX.Element[]
  children?: JSX.Element | JSX.Element[]
}

const defaultProps = {
  usePortal: true,
  autoFocus: true,
  enforceFocus: false,
  canOutsideClickClose: true,
  canEscapeKeyClose: true
}

export function Dialog(props: DialogProps) {
  return (
    <BluePrintDialog {...defaultProps} {...props} isOpen={true} className={css.dialog} isCloseButtonShown={false}>
      <Icon name="Stroke" size={15} onClick={props.onClose} className={css.close} />
      <Container padding="none" className={css.children}>
        {props.children}
      </Container>
      <footer>{props.footer}</footer>
    </BluePrintDialog>
  )
}
