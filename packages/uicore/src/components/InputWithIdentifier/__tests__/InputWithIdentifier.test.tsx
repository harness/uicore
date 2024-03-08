import React from 'react'
import { queryByAttribute, render, within } from '@testing-library/react'
import { FormInput } from 'components/FormikForm/FormikForm'
import userEvent from '@testing-library/user-event'
import { renderFormikForm } from 'components/FormikForm/__tests__/FormikForm.test'

describe('Test InputWithIdentifier', () => {
  function addNameAndAssertModifiedIdentifier(
    name: string,
    identifier: string,
    input: HTMLInputElement,
    idClass: HTMLInputElement
  ) {
    userEvent.type(input, name)
    expect(input).toHaveValue(name)
    expect(within(idClass).getByText(identifier)).toBeInTheDocument()
    userEvent.clear(input)
    expect(input).toHaveValue('')
  }
  test('allowHyphen false', async () => {
    const onSubmit = jest.fn()
    const { container } = render(
      renderFormikForm(
        <FormInput.InputWithIdentifier
          inputName="name"
          idName="identifier"
          inputLabel="Name"
          idLabel="ID"
          isIdentifierEditable
          maxInput={128}
          useUnversialToolTipId
          onIdentifierChangeCallback={onSubmit}
          // not passing allowHyphen as its optional
        />
      )
    )
    const input = queryByAttribute('name', container, 'name') as HTMLInputElement
    const idClass = container.querySelector('div.idValue') as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(idClass).toBeInTheDocument()

    addNameAndAssertModifiedIdentifier('Test Name', 'Test_Name', input, idClass)
    addNameAndAssertModifiedIdentifier('Test Name-123', 'Test_Name123', input, idClass)
    addNameAndAssertModifiedIdentifier('Test Name-123-', 'Test_Name123', input, idClass)
    addNameAndAssertModifiedIdentifier('-Test Name-123-', 'Test_Name123', input, idClass)
    addNameAndAssertModifiedIdentifier('-$Test Name-123-', 'Test_Name123', input, idClass)
    addNameAndAssertModifiedIdentifier('-$Test Name-123-', 'Test_Name123', input, idClass)
    addNameAndAssertModifiedIdentifier('_-$33var1--', '_$33var1', input, idClass)
    addNameAndAssertModifiedIdentifier('_-$33var-abc-1--', '_$33varabc1', input, idClass)
  })
  test('allowHyphen true', async () => {
    const onSubmit = jest.fn()
    const { container } = render(
      renderFormikForm(
        <FormInput.InputWithIdentifier
          inputName="name"
          idName="identifier"
          inputLabel="Name"
          idLabel="ID"
          isIdentifierEditable
          maxInput={128}
          useUnversialToolTipId
          onIdentifierChangeCallback={onSubmit}
          allowHyphen={true}
        />
      )
    )
    const input = queryByAttribute('name', container, 'name') as HTMLInputElement
    const idClass = container.querySelector('div.idValue') as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(idClass).toBeInTheDocument()

    addNameAndAssertModifiedIdentifier('Test Name', 'Test_Name', input, idClass)
    addNameAndAssertModifiedIdentifier('Test Name-123', 'Test_Name-123', input, idClass)
    addNameAndAssertModifiedIdentifier('Test Name-123-', 'Test_Name-123-', input, idClass)
    addNameAndAssertModifiedIdentifier('-Test Name-123-', 'Test_Name-123-', input, idClass)
    addNameAndAssertModifiedIdentifier('-$Test Name-123-', 'Test_Name-123-', input, idClass)
    addNameAndAssertModifiedIdentifier('-$Test Name-123-', 'Test_Name-123-', input, idClass)
    addNameAndAssertModifiedIdentifier('_-$33var1--', '_-$33var1--', input, idClass)
    addNameAndAssertModifiedIdentifier('_-$33var-abc-1--', '_-$33var-abc-1--', input, idClass)
  })
})
