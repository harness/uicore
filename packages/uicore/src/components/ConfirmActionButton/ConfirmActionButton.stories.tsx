/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Layout, ConfirmActionButton, ConfirmActionButtonProps, ButtonVariation } from '../..'

export default {
  title: 'Components / Confirm Action Button',

  component: ConfirmActionButton,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      }
    }
  },
  decorators: [
    Story => (
      <Layout.Horizontal spacing="small">
        <Story />
      </Layout.Horizontal>
    )
  ]
} as Meta
export const ConfirmButton: Story<ConfirmActionButtonProps> = args => {
  return (
    <>
      <ConfirmActionButton
        variation={ButtonVariation.ICON}
        icon="pause"
        onClick={() => alert('Action is confirmed')}
        {...args}
      />
      <ConfirmActionButton
        variation={ButtonVariation.ICON}
        icon="stop"
        onClick={() => alert('Action is confirmed')}
        {...args}
      />
    </>
  )
}
ConfirmButton.args = {
  title: 'Confirm Action',
  message: 'Are you sure you want to action to be  executed? This action cannot be undone.',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
}
