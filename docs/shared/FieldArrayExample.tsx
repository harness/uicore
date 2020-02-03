import React from 'react'

import { FieldArray, TextInput, Heading, Button, MultiSelect } from '../static/index'
import { FieldValue } from '../../src/components/FieldArray/FieldArray'
import { Formik } from 'formik'
import './FieldArrayExample.css'

export default function FieldArrayExample() {
  const fields = [
    {
      name: 'col1',
      label: 'Column 1 Header',
      defaultValue: 'Column 1 value'
    },
    {
      name: 'col2',
      label: <div style={{ color: 'red' }}>Column Header 2</div>,
      renderer: (value: FieldValue, _rowIndex: number, handleChange) => (
        <TextInput defaultValue={value} placeholder="Column 2 value" onChange={handleChange} />
      )
    },
    {
      name: 'col3',
      label: 'Column 3 Header',
      renderer: (value: FieldValue, _rowIndex: number, handleChange) => {
        const onChange = opts => {
          handleChange({ target: { value: opts } })
        }
        return (
          <MultiSelect
            className="multiSelect"
            items={[
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' }
            ]}
            placeholder="Column 3 value"
            onChange={onChange}
            value={value || []}
          />
        )
      }
    }
  ]

  const noDataText =
    'This is a no data/add data message. Use this to explain this widget to the use. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

  const data = [
    {
      col1: 'col 1',
      col2: 'col 2',
      col3: [{ label: 'Two', value: '2' }]
    },
    {
      col1: 'col 1',
      col2: 'col 2',
      col3: [{ label: 'One', value: '1' }]
    }
  ]

  return (
    <Formik
      initialValues={{ fieldArrayWithInitValue: data }}
      onSubmit={x => {
        console.log(JSON.stringify(x, null, 4))
        alert('Field value has been printed in the console for demo.')
      }}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <div style={{ width: '620px' }}>
            <Heading level={2}>Without data</Heading>
            <FieldArray name="fieldArrayWithoutInitValue" fields={fields} label="Field List" placeholder={noDataText} />

            <br />

            <Heading level={2}>With pre-filled data</Heading>
            <FieldArray name="fieldArrayWithInitValue" fields={fields} label="Field List" placeholder={noDataText} />
            <br />
            <Button type="submit" intent="primary">
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
