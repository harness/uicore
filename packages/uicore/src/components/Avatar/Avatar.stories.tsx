/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
      email="John.Doe@abc.com"
      onClick={() => {
        // eslint-disable-next-line
        alert(' Avatar clicked')
      }}
      size={'normal'}
      hoverCardDetailsCallBack={() => {
        // eslint-disable-next-line
        alert(' Details clicked')
      }}
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

// Edge case for testing, this should render user icon without any initials
export const NullName: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar name={null as any} {...args} />
  </Layout.Horizontal>
)
