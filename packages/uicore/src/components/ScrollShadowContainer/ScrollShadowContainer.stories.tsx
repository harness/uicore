/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { CSSProperties } from 'react'
import type { Meta, Story } from '@storybook/react'

import { ScrollShadowContainer, Text } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { ScrollShadowContainerProps } from './ScrollShadowContainer'

export default {
  title: 'Components / ScrollShadowContainer',

  component: ScrollShadowContainer,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Scroll Shadow Container</Title>

            <Subtitle>
              <pre>
                <code>{`import { ScrollShadowContainer }  from '@harness/uicore'`}</code>
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

const mainStyle: CSSProperties = {
  height: '200px',
  width: '500px',
  backgroundColor: 'white',
  color: 'black'
}

export const Basic: Story<ScrollShadowContainerProps> = args => {
  return (
    <>
      <ScrollShadowContainer
        id="sample-container-1"
        font={{
          align: 'center'
        }}
        {...args}>
        {[...Array(50)].map((_, index) => (
          <Text key={index}>The quick brown fox jumps over the lazy dog {index}</Text>
        ))}
      </ScrollShadowContainer>
    </>
  )
}

Basic.args = {
  style: mainStyle
}
