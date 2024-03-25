/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
