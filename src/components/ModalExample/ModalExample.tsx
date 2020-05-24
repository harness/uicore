import React from 'react'
import { ModalProvider } from '../Modal'
import { useModal } from '../Modal'
import { Button } from '../Button/Button'
import { Dialog, Classes, IDialogProps } from '@blueprintjs/core'

const ExampleModal = () => {
  const modalPropsLight: IDialogProps = {
    isOpen: true,
    usePortal: true,
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    title: 'Select Artifact Servers',
    className: Classes.DIALOG,
    style: { width: 600, height: 400 }
  }

  const modalPropsDark: IDialogProps = {
    isOpen: true,
    usePortal: true,
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    title: '',
    className: Classes.DARK,
    style: { width: 600, height: 400 }
  }

  const [openLightModal, hideLightModal] = useModal(() => (
    <Dialog onClose={hideLightModal} {...modalPropsLight}></Dialog>
  ))
  const [openDarkModal, hideDarkModal] = useModal(() => <Dialog onClose={hideDarkModal} {...modalPropsDark}></Dialog>)

  return (
    <React.Fragment>
      <Button text="Open Light Theme" onClick={openLightModal} /> &nbsp; &nbsp;
      <Button text="Open Dark Theme" onClick={openDarkModal} />
    </React.Fragment>
  )
}

export const ModalExample = () => {
  return (
    <ModalProvider>
      <ExampleModal />
    </ModalProvider>
  )
}
