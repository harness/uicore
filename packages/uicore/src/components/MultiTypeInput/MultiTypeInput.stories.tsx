/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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

import { MultiTypeInputType } from './MultiTypeInputUtils'

export default {
  title: 'Form / MultiTypeInput',
  argTypes: {
    name: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } }
  }
} as Meta

export const TextInput: Story<MultiTextInputProps> = args => <MultiTextInput mini={true} disabled={true} {...args} />

export const SelectInput: Story<MultiTypeInputProps> = args => <MultiTypeInput {...args} />

export const SelectInputWithCreationOfNewItems: Story<MultiTypeInputProps> = args => <MultiTypeInput {...args} />

export const MultiSelectInput: Story<MultiSelectTypeInputProps> = args => <MultiSelectTypeInput {...args} />

export const MultiSelectInputWithNoMenu: Story<MultiSelectTypeInputProps> = args => <MultiSelectTypeInput {...args} />

TextInput.args = {
  disabled: false,
  expressionPlaceHolder: '<+test.app>',
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ],
  allowableTypes: [
    MultiTypeInputType.FIXED,
    MultiTypeInputType.RUNTIME,
    MultiTypeInputType.EXPRESSION,
    MultiTypeInputType.REGEX
  ]
}

SelectInput.args = {
  selectProps: {
    items: data.slice(0, 10).map(row => ({ label: row.name, value: row.id })),
    addClearBtn: true
  },
  disabled: false,
  expressionPlaceHolder: '<+test.app>',
  value: { label: data[0].name, value: data[0].id },
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ],
  allowableTypes: [
    MultiTypeInputType.FIXED,
    MultiTypeInputType.RUNTIME,
    MultiTypeInputType.EXPRESSION,
    MultiTypeInputType.REGEX
  ]
}

SelectInputWithCreationOfNewItems.args = {
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ],
  expressionPlaceHolder: '<+test.app>',
  allowableTypes: [MultiTypeInputType.FIXED, MultiTypeInputType.RUNTIME, MultiTypeInputType.EXPRESSION],
  selectProps: {
    defaultSelectedItem: { label: data[0].name, value: data[0].id },
    noResults: 'No results',
    items: data.slice(0, 10).map(row => ({ label: row.name, value: row.id })),
    addClearBtn: true,
    allowCreatingNewItems: true,
    addTooltip: true
  }
}

MultiSelectInput.args = {
  multiSelectProps: {
    items: data.slice(0, 10).map(row => ({ label: row.name, value: row.id }))
  },
  value: data.slice(0, 2).map(row => ({ label: row.name, value: row.id })),
  disabled: false,
  expressionPlaceHolder: '<+test.app>',
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ]
}

MultiSelectInputWithNoMenu.args = {
  multiSelectProps: {
    items: data.slice(0, 10).map(row => ({ label: row.name, value: row.id }))
  },
  value: data.slice(0, 2).map(row => ({ label: row.name, value: row.id })),
  disabled: false,
  allowableTypes: [MultiTypeInputType.FIXED],
  expressionPlaceHolder: '<+test.app>',
  expressions: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayName'
  ]
}
