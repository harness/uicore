/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { GraphError, Layout } from '../..'
import { Props as GraphErrorProps } from '../GraphError/GraphError'

export default {
  title: 'Components / GraphError',

  component: GraphError,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>GraphError</Title>
            <Subtitle>
              <pre>
                <code>{`import {GraphError} from '@harness/uicore'`}</code>
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
export const Basic: Story<GraphErrorProps> = args => {
  return (
    <>
      <Layout.Horizontal spacing="small">
        <GraphError
          linkText={'View in Splunk'}
          onLinkClick={() => {
            alert('clicked')
          }}
          secondLinkText={'View call Logs'}
          onSecondLinkClick={() => {
            alert('clicked')
          }}
          {...args}></GraphError>
      </Layout.Horizontal>
    </>
  )
}
