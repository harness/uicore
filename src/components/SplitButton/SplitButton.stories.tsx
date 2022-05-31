/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Layout, SplitButton } from '../..'

export default {
  title: 'Components / SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>SplitButton</Title>

            <code>{`import {SplitButton} from '@harness/uicore'`}</code>
            <Description>
              {`SplitButton component reuses Blueprint's Button and Dropdown and implements the look and feel of [HDL](https://www.figma.com/file/ea1BP4IVHDXqeOND0S9YVZ/branch/2J7UGgUU3p83RkO4BtX1Mo/HDS-Toolkit?node-id=880%3A33183).`}
            </Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </>
        )
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
} as ComponentMeta<typeof SplitButton>

export const PrimarySplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <>
      <SplitButton text="Text Button" {...args} />
      <SplitButton icon="plus" {...args} />
      <SplitButton text="Left Icon" icon="chevron-left" {...args} />
      <SplitButton round text="Round Button" {...args} />
      <SplitButton text="Disabled" disabled icon="cog" {...args} />
      <SplitButton loading text="Text Button" {...args} />
    </>
  )
}
PrimarySplitButton.argTypes = { onClick: { action: 'clicked' } }
PrimarySplitButton.args = { intent: 'primary' }
