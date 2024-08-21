/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { DropDown, DropDownProps } from './DropDown'
import { Layout } from '../../layouts/Layout'
import { SelectOption } from '../../components/Select/Select'

const staticItems = [
  { label: 'Aborted', value: 'aborted' },
  { label: 'Expired', value: 'expired' },
  { label: 'Failed', value: 'failed' },
  { label: 'Running', value: 'running' },
  { label: 'Success', value: 'success' },
  { label: 'Approval Rejected', value: 'approval-rejected' },
  { label: 'Paused', value: 'paused' },
  { label: 'Waiting on approval', value: 'waiting-on-approval' },
  { label: 'Waiting on intervention', value: 'waiting-on-intervention' },
  { label: 'Waiting on resources', value: 'waiting-on-resources' }
]

export default {
  title: 'Components / DropDown',

  component: DropDown,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>DropDown</Title>
            <Subtitle>
              <pre>
                <code>{`import {DropDown} from '@harnessio/uicore'`}</code>
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

export const Basic: Story<DropDownProps> = args => {
  return (
    <Layout.Horizontal flex>
      <DropDown
        {...args}
        onChange={option => {
          // eslint-disable-next-line no-alert
          alert(option.value)
        }}
      />
    </Layout.Horizontal>
  )
}

Basic.args = {
  placeholder: 'Status',
  items: staticItems
}

export const AsyncItems: Story<DropDownProps> = () => {
  const [query, setQuery] = useState('')

  const items = async () =>
    new Promise<SelectOption[]>(resolve => {
      setTimeout(() => {
        resolve(staticItems.filter(item => item.label.includes(query)))
      }, 1000)
    })

  return (
    <Layout.Horizontal flex>
      <DropDown
        placeholder="Status"
        items={items}
        onChange={option => {
          // eslint-disable-next-line no-alert
          alert(option.value)
        }}
        onQueryChange={setQuery}
        query={query}
      />
    </Layout.Horizontal>
  )
}

export const AsyncItemsLazy: Story<DropDownProps> = () => {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<SelectOption[] | undefined>()

  const getLazyItems = async () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
        setItems(staticItems.filter(item => item.label.includes(query)))
      }, 1000)
    })
  }
  return (
    <Layout.Horizontal flex>
      <DropDown
        placeholder="Choose filter"
        onChange={option => {
          // eslint-disable-next-line no-alert
          alert(option.value)
        }}
        onQueryChange={setQuery}
        query={query}
        items={items}
        getLazyItems={getLazyItems}
      />
    </Layout.Horizontal>
  )
}
