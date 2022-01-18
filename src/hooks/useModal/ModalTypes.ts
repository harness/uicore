/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Intent } from '../../'

export interface ModalInfo {
  key: number
  parentKey: number
  Component: React.ReactNode
  options: ModalOptions
  resolve?: (value: unknown) => void
}

export interface ModalOptions {
  /** Entity that the modal represents, must be unique to make tooltip and testing stable */
  entityType: string

  /** Modal intent. Different intent renders different title */
  intent?: Intent

  /** Modal title, can be a string or a React component (custom title) */
  title: string | React.ReactNode

  /** Optional modal class name */
  className?: string

  /** Modal can be dragged from its header, default is false */
  draggable?: boolean
}
