/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { ReactNode } from 'react'
import { OverlayToaster, Position, ToasterInstance, Intent } from '@blueprintjs/core'
import css from './useToaster.css'

let toaster: ToasterInstance | null = null

function getToaster(): ToasterInstance {
  if (!toaster) {
    // Note: OverlayToaster.create uses ReactDOM.render which is deprecated in React 18
    // but Blueprint v4.20.x doesn't support createAsync yet. The warning can be ignored
    // until upgrading to Blueprint v5.x which has proper React 18 support.
    toaster = OverlayToaster.create({
      className: css.toaster,
      position: Position.TOP
    })
  }
  return toaster
}

export interface ToasterProps {
  showSuccess: (message: string | ReactNode, timeout?: number, key?: string) => void
  showError: (message: string | ReactNode, timeout?: number, key?: string) => void
  showWarning: (message: string | ReactNode, timeout?: number, key?: string) => void
  showPrimary: (message: string | ReactNode, timeout?: number, key?: string) => void
  show: ToasterInstance['show']
  dismiss: ToasterInstance['dismiss']
  clear: () => void
  getToasts: ToasterInstance['getToasts']
}

const showSuccess = (message: string | ReactNode, timeout?: number, key?: string): void => {
  getToaster().show({ message, intent: Intent.SUCCESS, icon: 'tick', timeout }, key)
}

const showError = (message: string | ReactNode, timeout?: number, key?: string): void => {
  getToaster().show({ message, intent: Intent.DANGER, icon: 'warning-sign', timeout }, key)
}

const showWarning = (message: string | ReactNode, timeout?: number, key?: string): void => {
  getToaster().show({ message, intent: Intent.WARNING, icon: 'error', timeout }, key)
}

const showPrimary = (message: string | ReactNode, timeout?: number, key?: string): void => {
  getToaster().show({ message, intent: Intent.PRIMARY, timeout }, key)
}

export function useToaster(): ToasterProps {
  return {
    showSuccess,
    showError,
    showWarning,
    showPrimary,
    show: (props, key) => {
      return getToaster().show(props, key)
    },
    dismiss: key => {
      getToaster().dismiss(key)
    },
    clear: () => {
      getToaster().clear()
    },
    getToasts: () => getToaster().getToasts()
  }
}
