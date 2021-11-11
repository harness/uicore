import React, { useCallback } from 'react'
import { Intent, Dialog, IDialogProps } from '@blueprintjs/core'
import {
  useModalHook,
  Button,
  ButtonProps,
  Layout,
  Container,
  Icon,
  Text,
  ButtonVariation,
  FontVariation,
  Color
} from '../../'
import css from './useConfirmationDialog.css'
import { HarnessIconName } from 'icons/HarnessIcons'

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
      <Dialog className={css.dialog} {...confirmDialogProps}>
        <Container flex className={css.iconContainer}>
          <Icon onClick={() => onClose(false)} className={css.icon} size={8} name="main-close" />
        </Container>

        <Layout.Horizontal className={css.header} padding={{ left: 'xsmall' }}>
          <Icon name={getIconForIntent(intent)} size={32} margin={{ right: 'small' }} />
          <Text font={{ variation: FontVariation.H4 }}>{titleText}</Text>
        </Layout.Horizontal>
        <Layout.Vertical
          font={{ variation: FontVariation.BODY }}
          color={Color.BLACK}
          margin={{ top: 'large', bottom: 'medium' }}
          className={css.body}>
          {contentText}
        </Layout.Vertical>
        <Layout.Horizontal spacing="small">
          {confirmButtonText && (
            <>
              <Button intent={buttonIntent} text={confirmButtonText} onClick={() => onClose(true)} />
            </>
          )}
          <Button variation={ButtonVariation.TERTIARY} text={cancelButtonText} onClick={() => onClose(false)} />
          {customButtons}
        </Layout.Horizontal>
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
