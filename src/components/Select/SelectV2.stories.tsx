/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import { SelectV2, SelectV2Props, Layout, Button } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import data from '../../_stories/components/pokedex.json'
import { omit } from 'lodash-es'
export default {
  title: 'Form / SelectV2',

  component: SelectV2,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>SelectV2</Title>

            <Subtitle>
              <pre>
                <code>{`import { SelectV2 }  from '@harness/uicore'`}</code>
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

interface SelectOption {
  label: string
  value: string | number | symbol
  icon?: any
}

const itemsLocal: SelectOption[] = data.map(row => ({
  label: row.name,
  value: row.id,
  icon: row.icon
}))

function dummyPromise(): Promise<SelectOption[]> {
  return new Promise<SelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(itemsLocal)
    }, 5000)
  })
}

export const SimpleSelect: Story<SelectV2Props> = args => {
  const [val, setVal] = useState<SelectOption>()
  const { items = itemsLocal } = args
  const argsCopy = omit(args, ['items', 'itemRenderer', 'tagRenderer'])
  return (
    <Layout.Horizontal id="primary-borderless-buttons">
      <SelectV2
        items={items}
        value={val}
        onChange={setVal}
        itemRenderer={(item, props) => (
          <Button
            style={{ width: '100%', display: 'block' }}
            minimal
            onClick={ev => {
              props.handleClick(ev as any)
            }}>
            {item.label}
          </Button>
        )}
        {...argsCopy}>
        <Button
          intent="primary"
          minimal
          style={{
            border: '1px solid var(--form-field-border)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          icon={val && val.icon && val.icon.name}
          rightIcon="chevron-down"
          text={val ? val.label : 'Search...'}
          withoutBoxShadow
        />
      </SelectV2>
    </Layout.Horizontal>
  )
}
export const AsyncSelect: Story<SelectV2Props> = args => {
  const { items = dummyPromise } = args
  const argsCopy = omit(args, ['items', 'itemRenderer', 'tagRenderer'])
  const [val, setVal] = useState<SelectOption>()
  return (
    <Layout.Horizontal id="primary-borderless-buttons">
      <SelectV2
        items={items}
        value={val}
        onChange={setVal}
        placeholder="xyz"
        itemRenderer={(item, props) => (
          <Button style={{ width: '100%', display: 'block' }} minimal onClick={ev => props.handleClick(ev as any)}>
            {item.label}
          </Button>
        )}
        {...argsCopy}>
        <Button
          intent="primary"
          minimal
          style={{ border: '1px solid var(--grey-400)', width: '100%', display: 'block' }}
          icon={val && val.icon && val.icon.name}
          rightIcon="chevron-down"
          text={val ? val.label : 'Search...'}
        />
      </SelectV2>
    </Layout.Horizontal>
  )
}
