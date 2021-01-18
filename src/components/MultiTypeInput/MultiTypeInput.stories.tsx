import React from 'react'
import type { Meta, Story } from '@storybook/react'

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
    name: { control: { type: 'text' } }
  }
} as Meta

export const TextInput: Story<MultiTextInputProps> = args => <MultiTextInput {...args} />

export const SelectInput: Story<MultiTypeInputProps> = args => <MultiTypeInput {...args} />

export const MultiSelectInput: Story<MultiSelectTypeInputProps> = args => <MultiSelectTypeInput {...args} />

TextInput.args = {
  mentionsInfo: {
    data: (done: (arg0: string[]) => void) =>
      done([
        'app.name',
        'app.description',
        'pipeline.name',
        'pipeline.description',
        'pipeline.identifier',
        'pipeline.stage.qa.displayName'
      ])
  }
}

SelectInput.args = {
  mentionsInfo: {
    data: (done: (arg0: string[]) => void) =>
      done([
        'app.name',
        'app.description',
        'pipeline.name',
        'pipeline.description',
        'pipeline.identifier',
        'pipeline.stage.qa.displayName'
      ])
  }
}

MultiSelectInput.args = {
  mentionsInfo: {
    data: (done: (arg0: string[]) => void) =>
      done([
        'app.name',
        'app.description',
        'pipeline.name',
        'pipeline.description',
        'pipeline.identifier',
        'pipeline.stage.qa.displayName'
      ])
  }
}
