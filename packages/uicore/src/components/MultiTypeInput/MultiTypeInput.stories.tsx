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

/* Multiline (Excel/Sheets-style) MultiTextInput showcase across mini/non-mini, value and maxHeight states. */
const MultilinePanel: React.FC<{
  title: string
  initialValue: string
  mini?: boolean
  maxHeight?: number
  disabled?: boolean
}> = ({ title, initialValue, mini, maxHeight, disabled }) => {
  const [value, setValue] = React.useState<string>(initialValue)
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#383946' }}>{title}</div>
      <MultiTextInput
        name={title}
        value={value}
        onChange={val => setValue((val as string) ?? '')}
        multiline
        mini={mini}
        disabled={disabled}
        textProps={maxHeight ? { style: { maxHeight } } : undefined}
        expressionPlaceHolder="<+test.app>"
        expressions={['app.name', 'pipeline.identifier']}
        allowableTypes={[MultiTypeInputType.FIXED, MultiTypeInputType.RUNTIME, MultiTypeInputType.EXPRESSION]}
      />
      <pre style={{ marginTop: 6, padding: 6, background: '#f4f6ff', fontSize: 11, color: '#383946' }}>
        {JSON.stringify({ value })}
      </pre>
    </div>
  )
}

export const MultilineTextInput: Story = () => {
  return (
    <div style={{ width: 560 }}>
      <h3 style={{ marginBottom: 4 }}>MultiTextInput · multiline (Excel / Google Sheets style)</h3>
      <p style={{ marginBottom: 20, color: '#6b6d85', fontSize: 13 }}>
        Single-line look-and-feel when empty or single-line. Press <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac) or{' '}
        <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows/Linux) to add a new line. Plain <kbd>Enter</kbd> is a no-op. The field
        grows up to its <code>maxHeight</code>, then scrolls.
      </p>

      <MultilinePanel
        title="A. Empty, mini (inline drawer case) — should look like a single-line input"
        initialValue=""
        mini
        maxHeight={72}
      />
      <MultilinePanel
        title="B. Single-line value, mini — should still look like a single-line input"
        initialValue="some plain value"
        mini
        maxHeight={72}
      />
      <MultilinePanel
        title="C. Multi-line value, mini, maxHeight=72px (inline drawer cap, 3 lines + scroll)"
        initialValue={'line one\nline two\nline three\nline four (overflow scrolls)'}
        mini
        maxHeight={72}
      />
      <MultilinePanel title="D. Empty, non-mini (Add/Edit modal case)" initialValue="" maxHeight={240} />
      <MultilinePanel
        title="E. Multi-line, non-mini, maxHeight=240px (modal cap, ~10 lines + scroll)"
        initialValue={'line one\nline two\nline three\nline four\nline five'}
        maxHeight={240}
      />
      <MultilinePanel title="F. Disabled, multi-line" initialValue={'line one\nline two'} disabled maxHeight={108} />
    </div>
  )
}

MultilineTextInput.args = {}

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

const longLabel =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"

SelectInput.args = {
  selectProps: {
    items: [
      ...data.slice(0, 10).map(row => ({ label: row.name, value: row.id })),
      {
        label: longLabel,
        value: longLabel
      }
    ],
    addClearBtn: true,
    addTooltip: true
  },
  disabled: false,
  expressionPlaceHolder: '<+test.app>',
  value: { label: longLabel, value: longLabel },
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
