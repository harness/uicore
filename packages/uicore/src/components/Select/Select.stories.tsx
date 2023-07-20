/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Select, SelectProps } from '../..'
import { omit } from 'lodash-es'
import { SelectOption, SelectSize } from './Select'
import data from '../../_stories/components/pokedex.json'

export default {
  title: 'Form / Select',

  component: Select,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Select</Title>
            <Subtitle>
              <pre>
                <code>{`import {Select} from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{'SelectSize:small,medium,large'}</Description>
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

export const Basic: Story<SelectProps> = args => {
  const [value, setValue] = useState<SelectOption | null | undefined>(args.value || null)
  return <Select {...args} value={value} onChange={item => setValue(item)} allowCreatingNewItems={true} />
}
Basic.args = {
  size: SelectSize.Medium,
  items: [
    { label: 'Kubernetes', value: 'service-kubernetes' },
    { label: 'GitHub', value: 'service-github' },
    { label: 'ELK', value: 'service-elk' },
    { label: 'Jenkins', value: 'service-jenkins' },
    { label: 'GCP', value: 'service-gcp' }
  ]
}

export const SelectWithIcons: Story<SelectProps> = args => {
  const {
    items = [
      {
        label: 'TryingTryingTryingTryingTryingTryingTryingTryingTrying',
        value: 'service-kubernetes',
        icon: { name: 'service-kubernetes' }
      },
      {
        label: 'Trying a long phrase with spaces to try out different combinations',
        value: 'service-github',
        icon: { name: 'service-github' }
      },
      { label: 'ELK', value: 'service-elk', icon: { name: 'service-elk' } },
      { label: 'Jenkins', value: 'service-jenkins', icon: { name: 'service-jenkins' } },
      { label: 'GCP', value: 'service-gcp', icon: { name: 'service-gcp' } }
    ]
  } = args
  const argsCopy = omit(args, ['size', 'items'])
  return (
    <div style={{ width: '300px' }}>
      <Select items={items} addClearBtn={true} {...argsCopy} />
    </div>
  )
}
SelectWithIcons.args = { size: SelectSize.Large }
export const AsyncSelect: Story<SelectProps> = args => {
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
  const [val, setVal] = useState<any>()
  const { items = dummyPromise } = args
  const argsCopy = omit(args, ['items'])
  return <Select items={items} value={val} onChange={val => setVal(val as any)} {...argsCopy} />
}
