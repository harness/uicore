/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
