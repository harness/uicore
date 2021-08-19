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
      <ConfirmActionButton variation={ButtonVariation.ICON} icon="pause" onClick={() => alert('Action is confirmed')} {...args} />
      <ConfirmActionButton variation={ButtonVariation.ICON} icon="stop" onClick={() => alert('Action is confirmed')} {...args} />
    </>
  )
}
ConfirmButton.args = {
  title: 'Confirm Action',
  message: 'Are you sure you want to action to be  executed? This action cannot be undone.',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
}
