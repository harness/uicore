/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Intent } from '@blueprintjs/core'
import { useModalHook } from '@harness/use-modal'
import { ButtonProps } from '../../'
import { ConfirmationDialog } from './ConfirmationDialog'

export interface UseConfirmationDialogProps {
  titleText: React.ReactNode
  contentText: React.ReactNode
  cancelButtonText?: React.ReactNode
  intent?: Intent
  buttonIntent?: ButtonProps['intent']
  confirmButtonText?: React.ReactNode
  onCloseDialog?: (isConfirmed: boolean) => void
  customButtons?: React.ReactNode
  showCloseButton?: boolean
  canOutsideClickClose?: boolean
  canEscapeKeyClose?: boolean
}

export interface UseConfirmationDialogReturn {
  openDialog: () => void
}

export const useConfirmationDialog = (props: UseConfirmationDialogProps): UseConfirmationDialogReturn => {
  const {
    titleText,
    contentText,
    cancelButtonText,
    intent = Intent.NONE,
    buttonIntent = Intent.PRIMARY,
    confirmButtonText,
    onCloseDialog,
    customButtons,
    showCloseButton,
    canOutsideClickClose,
    canEscapeKeyClose
  } = props

  const [showModal, hideModal] = useModalHook(() => {
    return (
      <ConfirmationDialog
        isOpen
        titleText={titleText}
        contentText={contentText}
        confirmButtonText={confirmButtonText}
        onClose={onClose}
        cancelButtonText={cancelButtonText}
        intent={intent}
        buttonIntent={buttonIntent}
        customButtons={customButtons}
        showCloseButton={showCloseButton}
        canOutsideClickClose={canOutsideClickClose}
        canEscapeKeyClose={canEscapeKeyClose}
      />
    )
  }, [props])

  const onClose = React.useCallback(
    (isConfirmed: boolean): void => {
      onCloseDialog?.(isConfirmed)
      hideModal()
    },
    [hideModal, onCloseDialog]
  )

  return {
    openDialog: () => showModal()
  }
}
