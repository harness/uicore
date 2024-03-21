/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { ConfirmationDialog, Button } from '../'
import { useToggleOpen } from './useToggle'

export default {
  title: 'Hooks / useToggleOpen'
} as Meta

export const Basic: Story = () => {
  const { isOpen, open, close } = useToggleOpen()
  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <ConfirmationDialog
        isOpen={isOpen}
        titleText="Are you sure?"
        contentText="Are you sure you want to perform this action?"
        cancelButtonText="No"
        confirmButtonText="Yes"
        onClose={close}
      />
    </>
  )
}

Basic.args = {}
