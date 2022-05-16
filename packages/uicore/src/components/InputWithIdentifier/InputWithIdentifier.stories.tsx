/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { noop } from 'lodash-es'

import { InputWithIdentifier, InputWithIdentifierProps } from './InputWithIdentifier'
import { Formik, FormikForm } from '../FormikForm/FormikForm'
import { Container } from '../Container/Container'

export default {
  title: 'Form / InputWithIdentifier',
  component: InputWithIdentifier
} as Meta

export const Basic: Story<InputWithIdentifierProps> = args => (
  <Formik initialValues={{}} onSubmit={noop} formName="inputWithIdentifierForm">
    {formikProps => (
      <Container width={400}>
        <FormikForm>
          <InputWithIdentifier {...args} formik={formikProps} />
        </FormikForm>
      </Container>
    )}
  </Formik>
)

Basic.args = {}
