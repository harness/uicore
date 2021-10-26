import React, { useCallback } from 'react'
import { Intent, Dialog, IconName, Classes, IDialogProps } from '@blueprintjs/core'
import { useModalHook, Button, ButtonProps, Layout } from '../../'

export interface UseConfirmationDialogProps {
  titleText: React.ReactNode
  contentText: React.ReactNode
  cancelButtonText: React.ReactNode
  intent?: Intent
  buttonIntent?: ButtonProps['intent']
  confirmButtonText?: React.ReactNode
  onCloseDialog?: (isConfirmed: boolean) => void
  customButtons?: React.ReactNode
}

export interface UseConfirmationDialogReturn {
  openDialog: () => void
}

const getIconForIntent = (intent: Intent): IconName => {
  switch (intent) {
    case Intent.DANGER:
      return 'error'
    case Intent.WARNING:
      return 'warning-sign'
    case Intent.SUCCESS:
      return 'small-tick'
    case Intent.PRIMARY:
      return 'info-sign'
    default:
      return 'info-sign'
  }
}

const confirmDialogProps: IDialogProps = {
  isOpen: true,
  usePortal: true,
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  enforceFocus: false,
  style: { width: 500, minHeight: 200 }
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
    customButtons
  } = props
  const [showModal, hideModal] = useModalHook(() => {
    return (
      <Dialog title={titleText} icon={getIconForIntent(intent)} onClose={() => onClose(false)} {...confirmDialogProps}>
        <div className={Classes.DIALOG_BODY}>{contentText}</div>
        <div className={Classes.DIALOG_FOOTER}>
          <Layout.Horizontal spacing="small">
            {confirmButtonText && (
              <Button intent={buttonIntent} text={confirmButtonText} onClick={() => onClose(true)} />
            )}
            <Button text={cancelButtonText} onClick={() => onClose(false)} />
            {customButtons}
          </Layout.Horizontal>
        </div>
      </Dialog>
    )
  }, [props])

  const onClose = useCallback(
    isConfirmed => {
      onCloseDialog?.(isConfirmed)
      hideModal()
    },
    [hideModal, onCloseDialog]
  )

  return {
    openDialog: () => showModal()
  }
}
