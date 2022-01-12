import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CategorizedSelect } from '../..'
import { CategorizedSelectProps } from '../CategorizedSelected/CategorizedSelect'
import { omit } from 'lodash-es'

export default {
  title: 'Form / CategorizedSelect',

  component: CategorizedSelect,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CategorizedSelect</Title>
            <Subtitle>
              <pre>
                <code>{`import {CategorizedSelect} from '@harness/uicore'`}</code>
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
export const Basic: Story<CategorizedSelectProps> = args => {
  const {
    items = [
      { label: 'Squirtle', value: 'squirtle', category: 'Water' },
      { label: 'Charizard', value: 'charizard', category: 'Fire' },
      { label: 'Venosaur', value: 'venosaur', category: 'Grass' },
      { label: 'Typhlosion', value: 'typhlosion', category: 'Fire' },
      { label: 'Feraligatr', value: 'feraligator', category: 'Water' }
    ]
  } = args
  const argsCopy = omit(args, ['items'])
  return <CategorizedSelect items={items} {...argsCopy} />
}
