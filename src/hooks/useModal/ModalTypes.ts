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
