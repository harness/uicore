/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { BreadcrumbsProps, Breadcrumbs } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'

import { Icon } from '@harness/icons'

export default {
  title: 'Components / Breadcrumbs',
  subcomponents: { IconProps: Icon },
  component: Breadcrumbs,

  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Breadcrumbs</Title>

            <Subtitle>
              <pre>
                <code>{`
import { Breadcrumbs }  from '@harness/uicore'
export interface Breadcrumb {
  url: string
  label: string
  iconProps?: IconProps
}`}</code>
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
export const Basic: Story<BreadcrumbsProps> = args => {
  const { links, className } = args
  return (
    <BrowserRouter>
      <Breadcrumbs links={links} className={className} />
    </BrowserRouter>
  )
}
Basic.args = {
  links: [
    {
      url: '#',
      label: 'Google',
      iconProps: { name: 'add', color: 'green500' }
    },
    {
      url: '#',
      label: 'Gmail',
      iconProps: { name: 'pipeline-approval', color: 'green500' }
    },
    {
      url: '#',
      label: 'Gmail2'
    }
  ]
}
