/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { queryByAttribute, render, within } from '@testing-library/react'
import { FormInput } from 'components/FormikForm/FormikForm'
import userEvent from '@testing-library/user-event'
import { renderFormikForm } from 'components/FormikForm/__tests__/FormikForm.test'
import { getIdentifierFromName } from '../InputWithIdentifier'

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
    const { container } = render(
      renderFormikForm(
        <FormInput.InputWithIdentifier
          inputName="name"
          idName="identifier"
          inputLabel="Name"
          idLabel="ID"
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
    const { container } = render(
      renderFormikForm(
        <FormInput.InputWithIdentifier
          inputName="name"
          idName="identifier"
          inputLabel="Name"
          idLabel="ID"
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

  test('test getIdentifierFromName() function', () => {
    expect(getIdentifierFromName('Test Name', true)).toBe('Test_Name')
    expect(getIdentifierFromName('Test Name', false)).toBe('Test_Name')

    expect(getIdentifierFromName('Test Name-123', true)).toBe('Test_Name-123')
    expect(getIdentifierFromName('Test Name-123', false)).toBe('Test_Name123')

    expect(getIdentifierFromName('Test Name-123-', true)).toBe('Test_Name-123-')
    expect(getIdentifierFromName('Test Name-123-', false)).toBe('Test_Name123')

    expect(getIdentifierFromName('-Test Name-123- ', true)).toBe('Test_Name-123-')
    expect(getIdentifierFromName('-$Test Name-123- ', true)).toBe('Test_Name-123-')
    expect(getIdentifierFromName('-$Test Name-123- ', true)).toBe('Test_Name-123-')
    //
    expect(getIdentifierFromName('-Test Name-123- ', false)).toBe('Test_Name123')
    expect(getIdentifierFromName('-$Test Name-123- ', false)).toBe('Test_Name123')
    expect(getIdentifierFromName('-$Test Name-123- ', false)).toBe('Test_Name123')

    expect(getIdentifierFromName('_-$33var1--', true)).toBe('_-$33var1--')
    expect(getIdentifierFromName('_-$33var1--', false)).toBe('_$33var1')

    expect(getIdentifierFromName('_-$33var-abc-1--', true)).toBe('_-$33var-abc-1--')
    expect(getIdentifierFromName('_-$33var-abc-1--', false)).toBe('_$33varabc1')
  })
})
