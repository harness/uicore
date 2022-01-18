/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, Description, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Layout, ButtonProps } from '../..'
import { GridListToggle, Views } from './GridListToggle'

export default {
  title: 'Components / GridListToggle',

  component: GridListToggle,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>GridListToggle</Title>
            <Subtitle>
              <code>{`import {GridListToggle} from '@harness/uicore'`}</code>
            </Subtitle>
            <Description>
              {'GridListToggle component can be used to switch between Grid and List view inside listing pages'}
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
} as Meta
export const PrimaryButton: Story<ButtonProps> = args => {
  return <GridListToggle initialSelectedView={Views.GRID} {...args} />
}
