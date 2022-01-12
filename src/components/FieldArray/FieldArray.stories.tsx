import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { FieldArray } from '../..'
import FieldArrayExample from './Examples/FieldArrayExample'

export default {
  title: 'Form / FieldArray',

  component: FieldArray,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>FieldArray</Title>
            <Subtitle>
              <>
                <pre>
                  <code>{`import {FieldArray} from '@harness/uicore'`}</code>
                </pre>
                <pre>
                  <code>{`interface Props {
  fields: Field[]
  label: string
  name: string
  placeholder?: string
  isDeleteOfRowAllowed?: (row: React<string, FieldValue>, rowIndex: number) => boolean
  addLabel?: string
  insertRowAtBeginning?: boolean
  onChange?: (params) => void
}

interface Field {
  name: string
  label: string
  defaultValue?: FieldValue
  renderer?: (
    value: FieldValue,
    rowIndex: number,
    onChange: (value: FieldValue>) => void
  ) => React.ReactElement
}

type FieldValue = string | number

type RowData = Record<string, FieldValue>`}</code>
                </pre>

                <h2>Usage</h2>
                <pre>
                  <code>
                    {`const fields: Array<Field> = [
    {
      name: 'col1',
      label: 'Column Header 1',
      defaultValue: 'Item 1'
    },
    {
      name: 'col2',
      label: <div style={{fontWeight: 'bold'}}>Column Header 2</div>,
      defaultValue: 'Item 2',
      renderer: (value, _index, handleChange) => (
        <TextInput
          defaultValue={value}
          placeholder="Column 2 value"
          onChange={e => handleChange(e.target.value)} />
      )
    },
    {
      name: 'col3',
      label: 'Column Header 3',
      defaultValue: 'Item 3',
      renderer: (value, _rowIndex, handleChange) => (
        <MultiSelect
          className="multiSelect"
          items={[
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' }
          ]}
          placeholder="Column 3 value"
          onChange={handleChange}
          value={value || []}
        />
      )
    }
  ]

const data: Array<RowData> = [
  {
      col1: 'row 1 col 1',
      col2: 'row 1 col 2',
      col3: 'row 1 col 3'
  }
]

<Formik initialValues={{ fieldArray: data }}>
  {props => (
    <form onSubmit={props.handleSubmit}>
      <FieldArray name='fieldArray' fields={fields} title="Field List" placeholder="Help Text" />
    </form>
  )}
</Formik>`}
                  </code>
                </pre>
              </>
            </Subtitle>
            <Description></Description>
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
export const Basic: Story<any> = () => {
  return <FieldArrayExample />
}
