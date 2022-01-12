/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { ColorPicker } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { ColorPickerProps } from '../ColorPicker/ColorPicker'

export default {
  title: 'Components / ColorPicker',

  component: ColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>ColorPicker</Title>
            <Description>{`ColorPicker allows to pick a color as being defined [here](https://www.sketch.com/s/0f81cf53-d980-4da3-bdbf-2dd49a875922/a/ndyo00#Inspector).`}</Description>
            <Subtitle>
              <pre>
                <code>{`import { ColorPicker }  from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta
export const NoPreSelectedColor: Story<ColorPickerProps> = args => {
  return (
    <>
      <ColorPicker onChange={color => console.log(color)} {...args} />
    </>
  )
}
export const WithPreSelectedColor: Story<ColorPickerProps> = args => {
  return (
    <>
      <ColorPicker color="#004fc4" onChange={color => console.log(color)} {...args} />
    </>
  )
}

export const CustomHeightAndWidth: Story<ColorPickerProps> = args => {
  return (
    <>
      <ColorPicker color="#004fc4" height={38} width={120} onChange={color => console.log(color)} {...args} />
    </>
  )
}
