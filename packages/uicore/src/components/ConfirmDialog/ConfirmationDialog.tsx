/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
import React from 'react'

import { Intent, Dialog, IDialogProps } from '@blueprintjs/core'

import { Button, ButtonProps, Layout, Container, Icon, Text, ButtonVariation, FontVariation, Color } from '../../'

import css from './ConfirmationDialog.css'
import { HarnessIconName } from '@harness/icons'

const getIconForIntent = (intent: Intent): HarnessIconName => {
  switch (intent) {
    case Intent.DANGER:
      return 'danger-icon'
    case Intent.WARNING:
      return 'warning-icon'
    case Intent.SUCCESS:
      return 'success-tick'
    case Intent.PRIMARY:
      return 'info-messaging'
    default:
      return 'info-messaging'
  }
}

export interface ConfirmationDialogProps extends Omit<IDialogProps, 'onClose' | 'enforceFocus'> {
  titleText: React.ReactNode
  contentText: React.ReactNode
  cancelButtonText?: React.ReactNode
  intent?: Intent
  buttonIntent?: ButtonProps['intent']
  confirmButtonText?: React.ReactNode
  onClose?: (isConfirmed: boolean) => void
  customButtons?: React.ReactNode
  showCloseButton?: boolean
}

const confirmDialogProps: Partial<IDialogProps> = {
  usePortal: true,
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  enforceFocus: false,
  style: { width: 500, minHeight: 218 }
}

export function ConfirmationDialog(props: ConfirmationDialogProps): React.ReactElement {
  const {
    titleText,
    contentText,
    cancelButtonText,
    intent = Intent.NONE,
    buttonIntent = Intent.PRIMARY,
    confirmButtonText,
    onClose,
    customButtons,
    showCloseButton = true,
    ...rest
  } = props

  function closeWithFalse(): void {
    onClose?.(false)
  }

  function closeWithTrue(): void {
    onClose?.(true)
  }

  return (
    <Dialog className={css.dialog} {...confirmDialogProps} {...rest} onClose={closeWithFalse}>
      {showCloseButton ? (
        <Container flex className={css.iconContainer}>
          <Icon onClick={closeWithFalse} className={css.icon} size={8} name="main-close" />
        </Container>
      ) : null}

      <Layout.Horizontal className={css.header} padding={{ left: 'xsmall' }}>
        <Icon name={getIconForIntent(intent)} size={32} margin={{ right: 'small' }} />
        <Text font={{ variation: FontVariation.H4 }}>{titleText}</Text>
      </Layout.Horizontal>
      <Layout.Vertical
        font={{ variation: FontVariation.BODY }}
        color={Color.BLACK}
        margin={{ top: 'large', bottom: 'xxlarge' }}
        className={css.body}>
        {contentText}
      </Layout.Vertical>
      <Layout.Horizontal spacing="small">
        {confirmButtonText ? <Button intent={buttonIntent} text={confirmButtonText} onClick={closeWithTrue} /> : null}
        {cancelButtonText ? (
          <Button variation={ButtonVariation.TERTIARY} text={cancelButtonText} onClick={closeWithFalse} />
        ) : null}
        {customButtons}
      </Layout.Horizontal>
    </Dialog>
  )
}
