import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { BreadcrumbsProps, Breadcrumbs } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'

import { Icon } from '../../icons/Icon'

export default {
  title: 'Components / Breadcrumbs',
  subcomponents: { Icon },
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
import { Breadcrumbs }  from '@wings-software/uicore'
export interface Breadcrumb {
  url: string
  label: string
  icon?: IconName
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
      icon: 'add'
    },
    {
      url: '#',
      label: 'Gmail',
      icon: 'airplane'
    },
    {
      url: '#',
      label: 'Gmail2'
    }
  ]
}
