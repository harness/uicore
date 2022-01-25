/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { ModalProvider, useModalHook, ModalErrorHandler, ModalErrorHandlerBinding } from '../Modal'
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
  let modalErrorHander: ModalErrorHandlerBinding

  const [openLightModal, hideLightModal] = useModalHook(() => (
    <Dialog onClose={hideLightModal} {...modalPropsLight}>
      <ModalErrorHandler
        bind={_handler => {
          modalErrorHander = _handler
        }}
      />
      <Button
        text="Show Sample Error"
        onClick={() => {
          modalErrorHander.show({
            status: 'FAILURE',
            code: 'INVALID_REQUEST',
            message: 'There is some issue with the request sent',
            validationErrors: [
              {
                field: 'accountId',
                message: 'accountId may not be null'
              }
            ],
            correlationId: 'de78435b-f904-428c-984a-52673241e3a8'
          })
        }}
      />
    </Dialog>
  ))
  const [openDarkModal, hideDarkModal] = useModalHook(() => (
    <Dialog onClose={hideDarkModal} {...modalPropsDark}>
      <ModalErrorHandler
        bind={_handler => {
          modalErrorHander = _handler
        }}
      />
      <Button
        text="Show Sample Error"
        onClick={() => {
          modalErrorHander.show({
            status: 'ERROR',
            code: 'DUPLICATE_FIELD',
            message: 'Oops, something went wrong on our end, please contact Harness Support.',
            detailedMessage:
              'Organization [org12da3454fdffabfsbfdahihddffssdsdfdfd24] under account [abcde] already exists',
            correlationId: '7e36b0b8-f64f-42a7-bc8c-82d571c2aee9'
          })
        }}
      />
    </Dialog>
  ))

  return (
    <React.Fragment>
      <Button text="Open Light Theme" onClick={openLightModal} /> &nbsp; &nbsp;
      <Button text="Open Dark Theme" onClick={openDarkModal} />
    </React.Fragment>
  )
}

export const ModalExample = () => {
  return <ExampleModal />
}
