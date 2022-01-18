/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
