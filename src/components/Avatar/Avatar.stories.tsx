import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, Avatar, AvatarProps } from '../..'

export default {
  title: 'Components / Avatar',
  component: Avatar
} as Meta

export const Normal: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar
      name="John Doe"
      onClick={() => {
        alert(' Avatar clicked')
      }}
      size={'normal'}
      {...args}
    />
  </Layout.Horizontal>
)

export const Small: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar email="ajohn.doe@harnes.io" name="aJoh Doe" size={'small'} {...args} />
  </Layout.Horizontal>
)

export const Xsmall: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar email="bjohn.doe@harnes.io" name="bJoh Doe" size={'xsmall'} {...args} />
  </Layout.Horizontal>
)

export const Medium: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar email="cjohn.doe@harnes.io" name="cJoh Doe" size={'medium'} {...args} />
  </Layout.Horizontal>
)

export const Large: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar email="djohn.doe@harnes.io" name="dJoh Doe" size={'large'} {...args} />
  </Layout.Horizontal>
)

export const BorderRadius: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar email="fjohn.doe@harnes.io" borderRadius={25} {...args} />
  </Layout.Horizontal>
)

export const Image: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar
      src="https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg"
      size={'large'}
      hoverCard={false}
      {...args}
    />
  </Layout.Horizontal>
)
