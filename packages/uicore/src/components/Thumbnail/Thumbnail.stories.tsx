/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Thumbnail, ThumbnailProps } from './Thumbnail'

export default {
  title: 'Components / Thumbnail',

  component: Thumbnail,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Thumbnail</Title>
            <Subtitle>
              <pre>
                <code>{`import {Thumbnail} from '@harness/uicore'`}</code>
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

export const Basic: Story<ThumbnailProps> = args => {
  return (
    <>
      <Thumbnail {...args} />
    </>
  )
}

Basic.args = {
  label: 'Kubernetes',
  icon: 'service-kubernetes',
  value: 'kubernetes',
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-alert
    alert(`Value: ${e.target.value}`)
  }
}

export const WithoutIcon: Story<ThumbnailProps> = args => {
  return (
    <>
      <Thumbnail {...args} />
    </>
  )
}

WithoutIcon.args = {
  label: 'Non Production',
  value: 'non-production',
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-alert
    alert(`Value: ${e.target.value}`)
  }
}
