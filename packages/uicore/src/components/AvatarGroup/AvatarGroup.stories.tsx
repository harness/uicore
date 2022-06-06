/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, AvatarGroup, AvatarGroupProps } from '../..'
import { Color } from '@harness/design-system'

export default {
  title: 'Components / AvatarGroup',
  component: AvatarGroup
} as Meta
export const Normal: Story<AvatarGroupProps> = args => {
  let { avatars } = args
  if (!avatars) {
    avatars = [
      { name: 'Aahn Boe SS' },
      { email: 'CohnDoe.com.HD@harnes.io' },
      { name: 'EahnFoe' },
      { name: 'Gahn Hoe', backgroundColor: Color.RED_800 },
      { name: '' },
      {
        src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
      }
    ]
  }
  return (
    <Layout.Horizontal spacing="small" id="primary-buttons">
      <AvatarGroup
        onAdd={() => {
          // eslint-disable-next-line
          alert('add button clicked')
        }}
        {...args}
        size="normal"
        avatars={avatars}
      />
    </Layout.Horizontal>
  )
}
export const Xsmall: Story<AvatarGroupProps> = args => {
  let { avatars } = args
  if (!avatars) {
    avatars = [
      { name: 'Aahn Boe SS' },
      { email: 'CohnDoe.com.HD@harnes.io' },
      { name: 'EahnFoe' },
      { name: 'Gahn Hoe', backgroundColor: Color.RED_800 },
      { name: '' },
      {
        src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
      }
    ]
  }
  return (
    <Layout.Horizontal spacing="small" id="primary-buttons">
      <AvatarGroup
        onAdd={() => {
          // eslint-disable-next-line
          alert('add button clicked')
        }}
        {...args}
        size="xsmall"
        avatars={avatars}
      />
    </Layout.Horizontal>
  )
}
export const Small: Story<AvatarGroupProps> = args => {
  let { avatars } = args
  if (!avatars) {
    avatars = [
      { name: 'Aahn Boe SS' },
      { email: 'CohnDoe.com.HD@harnes.io' },
      { name: 'EahnFoe' },
      { name: 'Gahn Hoe', backgroundColor: Color.RED_800 },
      { name: '' },
      {
        src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
      }
    ]
  }
  return (
    <Layout.Horizontal spacing="small" id="primary-buttons">
      <AvatarGroup
        onAdd={() => {
          // eslint-disable-next-line
          alert('add button clicked')
        }}
        {...args}
        size="small"
        avatars={avatars}
      />
    </Layout.Horizontal>
  )
}
export const Large: Story<AvatarGroupProps> = args => {
  let { avatars } = args
  if (!avatars) {
    avatars = [
      { name: 'Aahn Boe SS' },
      { email: 'CohnDoe.com.HD@harnes.io' },
      { name: 'EahnFoe' },
      { name: 'Gahn Hoe', backgroundColor: Color.RED_800 },
      { name: '' },
      {
        src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
      }
    ]
  }
  return (
    <Layout.Horizontal spacing="small" id="primary-buttons">
      <AvatarGroup
        onAdd={() => {
          // eslint-disable-next-line
          alert('add button clicked')
        }}
        {...args}
        size="large"
        avatars={avatars}
      />
    </Layout.Horizontal>
  )
}
export const Medium: Story<AvatarGroupProps> = args => {
  let { avatars } = args
  if (!avatars) {
    avatars = [
      { name: 'Aahn Boe SS' },
      { email: 'CohnDoe.com.HD@harnes.io' },
      { name: 'EahnFoe' },
      { name: 'Gahn Hoe', backgroundColor: Color.RED_800 },
      { name: '' },
      {
        src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
      }
    ]
  }
  return (
    <Layout.Horizontal spacing="small" id="primary-buttons">
      <AvatarGroup
        onAdd={() => {
          // eslint-disable-next-line
          alert('add button clicked')
        }}
        {...args}
        size="medium"
        avatars={avatars}
      />
    </Layout.Horizontal>
  )
}
