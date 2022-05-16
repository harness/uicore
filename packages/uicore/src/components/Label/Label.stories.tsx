/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Label, Layout, TextInput } from '../..'
import { LabelProps } from '../Label/Label'

export default {
  title: 'Form / Label',

  component: Label,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Label</Title>
            <Subtitle>
              <pre>
                <code>{`import {Label} from '@harness/uicore'`}</code>
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
export const Basic: Story<LabelProps> = args => {
  return (
    <Layout.Vertical>
      <Label {...args}>My Label</Label>
      <TextInput defaultValue="" placeholder="Placeholder text" />
    </Layout.Vertical>
  )
}
export const Basic2: Story<LabelProps> = args => {
  return (
    <div style={{ width: '200px' }}>
      <Layout.Horizontal spacing="small" flex={{ align: 'center-center' }}>
        <Label {...args}>My Label</Label>
        <TextInput defaultValue="" placeholder="Placeholder text" />
      </Layout.Horizontal>
    </div>
  )
}
