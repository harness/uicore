/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useCallback, useState, useMemo } from 'react'
import * as React from 'react'
import { ModalType, ModalContext } from './ModalContext'
import { ModalRoot } from './ModalRoot'
import './Modal.css'
/**
 * Modal Provider Props
 */
export interface ModalProviderProps {
  /**
   * Specifies the root element to render modals into
   */
  container?: Element

  /**
   * Container component for modal nodes
   */
  rootComponent?: React.ComponentType<any>

  /**
   * Subtree that will receive modal context
   */
  children: React.ReactNode
}

/**
 * Modal Provider
 *
 * Provides modal context and renders ModalRoot.
 */
export const ModalProvider = ({ container, rootComponent, children }: ModalProviderProps) => {
  if (container && !(container instanceof HTMLElement)) {
    throw new Error('Container must specify DOM element to mount modal root into.')
  }
  const [modals, setModals] = useState<Record<string, ModalType>>({})
  const showModal = useCallback(
    (key: string, modal: ModalType) =>
      setModals(modals => ({
        ...modals,
        [key]: modal
      })),
    []
  )
  const hideModal = useCallback(
    (key: string) =>
      setModals(modals => {
        const newModals = { ...modals }
        delete newModals[key]
        return newModals
      }),
    []
  )
  const contextValue = useMemo(() => ({ showModal, hideModal }), [])

  return (
    <ModalContext.Provider value={contextValue}>
      <React.Fragment>
        {children}
        <ModalRoot modals={modals} component={rootComponent} container={container} />
      </React.Fragment>
    </ModalContext.Provider>
  )
}
