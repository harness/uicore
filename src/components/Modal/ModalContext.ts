/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import * as React from 'react'

declare global {
  interface Window {
    bugsnagClient?: {
      notify?(e: unknown): void
    }
  }
}

/**
 * Modals are represented as react components
 *
 * This is what gets passed to useModal as the first argument.
 */
export type ModalType = React.FunctionComponent<any>

export const ERR_MSG =
  'Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider.'

/**
 * The shape of the modal context
 */
export interface ModalContextType {
  showModal(key: string, component: ModalType): void
  hideModal(key: string): void
}

/**
 * Throw error when ModalContext is used outside of context provider
 */
const invariantViolation = () => {
  if (window.bugsnagClient && typeof window.bugsnagClient.notify === 'function') {
    window.bugsnagClient.notify(new Error(ERR_MSG))
  }
}

/**
 * Modal Context Object
 */
export const ModalContext = React.createContext<ModalContextType>({
  showModal: invariantViolation,
  hideModal: invariantViolation
})
