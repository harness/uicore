import React from 'react'
import type { Meta, Story } from '@storybook/react'
import data from '../../_stories/components/pokedex.json'

import {
  MultiTextInput,
  MultiTextInputProps,
  MultiTypeInput,
  MultiTypeInputProps,
  MultiSelectTypeInput,
  MultiSelectTypeInputProps
} from './MultiTypeInput'

export default {
  title: 'Form / MultiTypeInput',
  argTypes: {
    name: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } }
  }
} as Meta

export const TextInput: Story<MultiTextInputProps> = args => <MultiTextInput mini={true} disabled={true} {...args} />

export const SelectInput: Story<MultiTypeInputProps> = args => <MultiTypeInput {...args} />

export const MultiSelectInput: Story<MultiSelectTypeInputProps> = args => <MultiSelectTypeInput {...args} />

TextInput.args = {
  disabled: false,
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ]
}

SelectInput.args = {
  selectProps: {
    items: data.slice(0, 10).map(row => ({ label: row.name, value: row.id })),
    addClearBtn: true
  },
  disabled: false,
  value: { label: data[0].name, value: data[0].id },
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ]
}

MultiSelectInput.args = {
  multiSelectProps: {
    items: data.slice(0, 10).map(row => ({ label: row.name, value: row.id }))
  },
  value: data.slice(0, 2).map(row => ({ label: row.name, value: row.id })),
  disabled: false,
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ]
}
