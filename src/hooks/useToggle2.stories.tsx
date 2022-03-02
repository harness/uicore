/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
