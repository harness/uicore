import React from 'react'
import { render } from '@testing-library/react'
import { Formik, FormikForm, FormInput } from './FormikForm'
import { Button } from '../Button/Button'

const renderFormikForm = (
  fields: React.ReactNode,
  submitMethod = jest.fn(),
  initialValues = {},
  disabled = false,
  inline = false
) => {
  return (
    <Formik initialValues={initialValues} onSubmit={submitMethod} formName="testform">
      <FormikForm disabled={disabled} inline={inline}>
        {fields}
        <Button intent="primary" type="submit" text="Submit" />
      </FormikForm>
    </Formik>
  )
}

const renderFormikFormWithoutFormName = (
  fields: React.ReactNode,
  submitMethod = jest.fn(),
  initialValues = {},
  disabled = false,
  inline = false
) => {
  return (
    <Formik initialValues={initialValues} onSubmit={submitMethod}>
      <FormikForm disabled={disabled} inline={inline}>
        {fields}
        <Button intent="primary" type="submit" text="Submit" />
      </FormikForm>
    </Formik>
  )
}

describe('Test basic Components', () => {
  test('should render Text component', () => {
    const { container } = render(renderFormikFormWithoutFormName(<FormInput.Text name="name" label="Name" />))
    expect(container).toMatchSnapshot()
  })
  test('should render TextArea component', () => {
    const { container } = render(renderFormikFormWithoutFormName(<FormInput.TextArea name="name" label="Name" />))
    expect(container).toMatchSnapshot()
  })
  test('should render Select component', () => {
    const { container } = render(
      renderFormikForm(
        <FormInput.Select
          items={[
            { label: 'red', value: 'Red' },
            { label: 'blue', value: 'Blue' }
          ]}
          name="color"
          label="Color"
        />
      )
    )
    expect(container).toMatchSnapshot()
  })
  test('should render MultiSelect component', () => {
    const { container } = render(
      renderFormikForm(
        <FormInput.MultiSelect
          items={[
            { label: 'red', value: 'Red' },
            { label: 'blue', value: 'Blue' }
          ]}
          name="color"
          label="Color"
        />
      )
    )
    expect(container).toMatchSnapshot()
  })
  test('should render Checkbox component', () => {
    const { container } = render(renderFormikForm(<FormInput.CheckBox name="color" label="Color" />))
    expect(container).toMatchSnapshot()
  })
  test('should render RadioGroup component', () => {
    const { container } = render(
      renderFormikForm(
        <FormInput.RadioGroup
          items={[
            { label: 'red', value: 'Red' },
            { label: 'blue', value: 'Blue' }
          ]}
          name="color"
          label="Color"
        />
      )
    )
    expect(container).toMatchSnapshot()
  })
  test('should render FileInput component', () => {
    const { container } = render(
      renderFormikForm(
        <FormInput.FileInput name="file" label="Attach File" placeholder="Select file..." buttonText="Select" />
      )
    )
    expect(container).toMatchSnapshot()
  })
  test('should render Custom Input component', () => {
    const { container } = render(
      renderFormikForm(
        <FormInput.CustomRender
          name="counter"
          label="Increment"
          render={formik => (
            <Button
              text="Click Me"
              onClick={() => formik.setFieldValue('counter', parseInt(formik?.values?.counter) + 1)}
            />
          )}
        />,
        jest.fn(),
        { counter: 0 }
      )
    )
    expect(container).toMatchSnapshot()
  })

  test('should render FileInput component', () => {
    const { container } = render(
      renderFormikForm(
        <FormInput.TagInput
          name="tags"
          label="Add Tag"
          items={[
            'The Godfather',
            'The Godfather: Part II',
            'The Dark Knight',
            '12 Angry Men',
            "Schindler's List",
            'Special'
          ]}
          labelFor={name => name as string}
          itemFromNewTag={newTag => newTag}
          tagInputProps={{
            openOnKeyDown: false,
            showAddTagButton: true,
            showClearAllButton: true,
            allowNewTag: true,
            placeholder: 'Enter tags...',
            getTagProps: (value, _index, _selectedItems, createdItems) => {
              return createdItems.includes(value)
                ? { intent: 'danger', minimal: true }
                : { intent: 'primary', minimal: true }
            }
          }}
        />
      )
    )
    expect(container).toMatchSnapshot()
  })
})
