/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Button } from '../../'
import { useToaster } from './useToaster'

export default {
  title: 'Hooks / useToaster'
} as Meta

export const Basic: Story = args => {
  const { showError, showPrimary, showSuccess, showWarning } = useToaster()
  return (
    <>
      <Button
        onClick={() => {
          showPrimary(args.message, args.timeout)
        }}>
        Primary
      </Button>
      <Button
        onClick={() => {
          showSuccess(args.message, args.timeout)
        }}>
        Success
      </Button>
      <Button
        onClick={() => {
          showWarning(args.message, args.timeout)
        }}>
        Warning
      </Button>
      <Button
        onClick={() => {
          showError(args.message, args.timeout)
        }}>
        Error
      </Button>
    </>
  )
}

Basic.args = {
  message: 'This is a toast message',
  timeout: 5000
}
