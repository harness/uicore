import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, Avatar, AvatarProps } from '../..'

export default {
  title: 'Components / Avatar',
  component: Avatar
} as Meta

export const Basic: Story<AvatarProps> = args => (
  <Layout.Horizontal spacing="small" id="primary-buttons">
    <Avatar {...args} />
    <Avatar
      name="John Doe"
      onClick={() => {
        alert(' Avatar clicked')
      }}
      size={'normal'}
    />
    <Avatar email="ajohn.doe@harnes.io" name="aJoh Doe" size={'small'} />
    <Avatar email="bjohn.doe@harnes.io" name="bJoh Doe" size={'xsmall'} />
    <Avatar email="cjohn.doe@harnes.io" name="cJoh Doe" size={'medium'} />
    <Avatar email="djohn.doe@harnes.io" name="dJoh Doe" size={'large'} />
    <Avatar email="ejohn.doe@harnes.io" name="eJoh Doe" />
    <Avatar email="fjohn.doe@harnes.io" borderRadius={25} />
    <Avatar
      src="https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg"
      size={'large'}
      hoverCard={false}
    />
  </Layout.Horizontal>
)
