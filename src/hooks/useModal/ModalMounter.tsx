import React from 'react'
import { ModalRenderer } from './ModalRender'
import { ModalInfoContextProvider, useModalContext, ModalInfoContextSetter } from './ModalContext'

export function ModalMounter() {
  const { dataset = [] } = useModalContext()

  return (
    <>
      {dataset.map(modalInfo => (
        <ModalInfoContextProvider key={`modal-${modalInfo.key}`}>
          <ModalRenderer modalInfo={modalInfo} />
          <ModalInfoContextSetter modalInfo={modalInfo} />
        </ModalInfoContextProvider>
      ))}
    </>
  )
}
