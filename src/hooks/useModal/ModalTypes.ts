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
  entityType: string
  intent?: Intent
  title: string | React.ReactNode
  className?: string
}
