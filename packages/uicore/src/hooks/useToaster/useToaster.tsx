/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react'
import { Toaster, Position, IToaster, Intent } from '@blueprintjs/core'
import css from './useToaster.css'

const toaster = Toaster.create({
  className: css.toaster,
  position: Position.TOP
})

export interface ToasterProps extends IToaster {
  showSuccess: (message: string | ReactNode, timeout?: number, key?: string) => void
  showError: (message: string | ReactNode, timeout?: number, key?: string) => void
  showWarning: (message: string | ReactNode, timeout?: number, key?: string) => void
  showPrimary: (message: string | ReactNode, timeout?: number, key?: string) => void
}

const showSuccess = (message: string | ReactNode, timeout?: number, key?: string): void => {
  toaster.show({ message, intent: Intent.SUCCESS, icon: 'tick', timeout }, key)
}

const showError = (message: string | ReactNode, timeout?: number, key?: string): void => {
  toaster.show({ message, intent: Intent.DANGER, icon: 'warning-sign', timeout }, key)
}

const showWarning = (message: string | ReactNode, timeout?: number, key?: string): void => {
  toaster.show({ message, intent: Intent.WARNING, icon: 'error', timeout }, key)
}

const showPrimary = (message: string | ReactNode, timeout?: number, key?: string): void => {
  toaster.show({ message, intent: Intent.PRIMARY, timeout }, key)
}

export function useToaster(): ToasterProps {
  return {
    ...toaster,
    showSuccess,
    showError,
    showWarning,
    showPrimary,
    clear: () => {
      toaster.clear()
    }
  }
}
