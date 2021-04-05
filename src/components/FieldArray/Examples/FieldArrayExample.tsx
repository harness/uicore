/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/display-name */
import React from 'react'

import { FieldArray, TextInput, Heading, Button, Select, MultiSelect } from '../../..'
import { Field } from '../../FieldArray/FieldArray'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './FieldArrayExample.css'

const rowSchema = Yup.object().shape({
  col2: Yup.string().required('col2 is required')
})

const validationSchema = Yup.object().shape({
  fieldArrayWithInitValue: Yup.array().of(rowSchema).ensure()
})

export default function FieldArrayExample() {
  const fields: Field[] = [
    {
      name: 'col1',
      label: 'Column 1 Header',
      defaultValue: 'Column 1 value'
    },
    {
      name: 'col2',
      label: <div style={{ fontWeight: 'bold' }}>Custom Bold Header</div>,
      renderer: (value, _rowIndex, handleChange, error) => (
        <React.Fragment>
          <TextInput
            defaultValue={value}
            placeholder="Column 2 value"
            onChange={(e: any) => {
              handleChange(e.target.value)
            }}
          />
          <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>
        </React.Fragment>
      )
    },
    {
      name: 'col3',
      label: 'Column 3 Header',
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

  const fields2: Field[] = [
    {
      name: 'name',
      label: 'Name',
      defaultValue: '',
      renderer: (value, _rowIndex, handleChange) => (
        <TextInput defaultValue={value} placeholder="" onChange={handleChange} />
      )
    },
    {
      name: 'type',
      label: 'Type',
      renderer: (value, _rowIndex, handleChange) => (
        <Select
          items={[
            { label: 'Text', value: 'TEXT' },
            { label: 'Encrypted Text', value: 'ENCRYPTED_TEXT' }
          ]}
          value={value}
          onChange={handleChange}
        />
      )
    }
  ]

  const noDataText =
    'This is a no data/add data message. Use this to explain this widget to the use. Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

  const data = [
    {
      col1: 'col 1 - 1',
      col2: 'col 2',
      col3: [{ label: 'Two', value: '2' }]
    },
    {
      col1: 'col 1 - 2',
      col2: 'col 2',
      col3: [{ label: 'One', value: '1' }]
    },
    {
      col1: 'col 1 - 3',
      col2: undefined,
      col3: [{ label: 'One', value: '1' }]
    }
  ]

  const data2 = [
    {
      name: 'var1',
      type: ''
    }
  ]

  const handleSubmit = (x: any) => {
    console.log(JSON.stringify(x, null, 4))
    alert('Field value has been printed in the console for demo.')
  }

  return (
    <React.Fragment>
      <Heading level={2}>Without data</Heading>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div style={{ width: '620px' }}>
              <FieldArray
                name="fieldArrayWithoutInitValue"
                fields={fields}
                label="Field List"
                placeholder={noDataText}
              />
              <br />
              <Button type="submit" intent="primary">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <hr />
      <Heading level={2}>With pre-filled data</Heading>
      <Formik
        initialValues={{ fieldArrayWithInitValue: data }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div style={{ width: '820px' }}>
              <FieldArray
                addLabel="Add Row"
                name="fieldArrayWithInitValue"
                insertRowAtBeginning={false}
                fields={fields}
                label="Field List with MultiSelect"
                placeholder={noDataText}
                isDeleteOfRowAllowed={row => row.col1 !== 'col 1 - 1'}
                onChange={params => console.log('onChange: ', params)}
              />
              <br />
              <Button type="submit" intent="primary">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <hr />
      <Formik initialValues={{ fieldArrayWithInitValue2: data2 }} onSubmit={handleSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div style={{ width: '620px' }}>
              <FieldArray
                name="fieldArrayWithInitValue2"
                fields={fields2}
                label="Field List with Select"
                placeholder={noDataText}
              />
              <br />
              <Button type="submit" intent="primary">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </React.Fragment>
  )
}
