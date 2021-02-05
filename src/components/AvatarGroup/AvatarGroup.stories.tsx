import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, AvatarGroup, AvatarGroupProps, Color } from '../..'

export default {
  title: 'Components / AvatarGroup',
  component: AvatarGroup
} as Meta

export const Basic: Story<AvatarGroupProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <AvatarGroup {...args} />
    <AvatarGroup
      onAdd={() => {
        // eslint-disable-next-line
        alert('add button clicked')
      }}
      avatars={[
        { name: 'Aahn Boe SS' },
        { email: 'CohnDoe.com.HD@harnes.io' },
        { name: 'EahnFoe' },
        { name: 'Gahn Hoe', backgroundColor: Color.RED_800 },
        { name: '' },
        { src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg' }
      ]}
      size="normal"
    />
    <AvatarGroup
      onAdd={() => {
        // eslint-disable-next-line
        alert('add button clicked')
      }}
      avatarGroupProps={{
        color: Color.BLACK,
        hoverCard: false
      }}
      avatars={[
        { name: 'Aahn Boe SS' },
        { email: 'CohnDoe.com.HD@harnes.io' },
        { name: 'EahnFoe' },
        { name: 'Gahn Hoe' },
        { name: '' },
        { src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg' }
      ]}
      size="small"
    />
    <AvatarGroup
      avatars={[
        { name: 'Aahn Boe SS' },
        { email: 'CohnDoe.com.HD@harnes.io' },
        { name: 'EahnFoe' },
        { name: 'Gahn Hoe' },
        { src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg' }
      ]}
      size="medium"
      onAdd={() => {
        // eslint-disable-next-line
        alert('add button clicked')
      }}
    />
    <AvatarGroup
      avatars={[
        { name: 'Aahn Boe SS' },
        {
          src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
        },
        { email: 'CohnDoe.com.HD@harnes.io' },
        { name: 'EahnFoe' },
        {
          src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
          hoverCard: false
        },
        { name: 'Gahn Hoe' },
        { name: 'Gahn fdHoe' }
      ]}
      size="xsmall"
      onAdd={() => {
        // eslint-disable-next-line
        alert('add button clicked')
      }}
    />
    <AvatarGroup
      avatars={[
        { name: 'Aahn Boe SS' },
        { email: 'CohnDoe.com.HD@harnes.io' },
        { name: 'EahnFoe' },
        { name: 'Gahn Hoe' },
        { src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg' }
      ]}
      size="large"
      onAdd={() => {
        // eslint-disable-next-line
        alert('add button clicked')
      }}
    />
  </Layout.Horizontal>
)
