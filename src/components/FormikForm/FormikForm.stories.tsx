import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { noop } from 'lodash-es'
import * as Yup from 'yup'

import { Formik, FormikForm, FormInput } from '../FormikForm/FormikForm'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { FormikFormProps } from 'formik'

export default {
  title: 'Form / FormikForm',
  component: FormikForm
} as Meta

export const Basic: Story<FormikFormProps> = () => (
  <Container width={400} margin={{ left: 'large' }}>
    <Formik
      initialValues={{
        name: '',
        tags: {},
        multiInput: '',
        colorMulti: '',
        description: '',
        specialPerson: true,
        exp: '<+app.name>',
        jobDesc2: '<+input>.allowedValues(10, 20, 30)'
      }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        name: Yup.string().trim().required('First Name is required field'),
        color: Yup.string().trim().required('Color is required field'),
        specialPerson: Yup.boolean().required('VVIP is required field'),
        colorMulti: Yup.array().ensure().compact().min(1, 'Color Multi is required field'),
        picture: Yup.string().trim().required('Picture is required field'),
        exp: Yup.string().trim().required('Expression is required field'),
        description: Yup.string().trim().required('Description is required field'),
        sportsAndPokemon: Yup.string().required('Sports and Pokemon is required')
      })}>
      {() => {
        return (
          <FormikForm>
            <FormInput.Text name="name" label="Name" placeholder="First Name" />
            <FormInput.Text
              name="age"
              inputGroup={{ type: 'number' }}
              label="Age"
              isOptional
              placeholder="Age in years"
            />
            <FormInput.KVTagInput
              name="tags"
              label="Tags"
              tooltipProps={{
                dataTooltipId: 'tagInputId'
              }}
              mentionsInfo={{
                data: done =>
                  done([
                    'app.name',
                    'app.description',
                    'pipeline.name',
                    'pipeline.description',
                    'pipeline.identifier',
                    'pipeline.stage.qa.displayName'
                  ])
              }}
            />
            <FormInput.ExpressionInput
              items={[
                'app.name',
                'app.description',
                'pipeline.name',
                'pipeline.description',
                'pipeline.identifier',
                'pipeline.stage.qa.displayName'
              ]}
              name="exp"
              label="Expressions"
              tooltipProps={{
                dataTooltipId: 'idforexpressioninput'
              }}
            />
            <FormInput.CheckBox name="specialPerson" label="VVIP" />
            <FormInput.FileInput name="picture" label="Upload Picture" buttonText="Select" />
            <FormInput.RadioGroup
              name="eventType"
              label="Event Type"
              items={[
                { label: 'Public', value: 'public' },
                { label: 'Private', value: 'private' }
              ]}
            />
            <FormInput.Select
              name="color"
              label="Color"
              placeholder="Select Color"
              items={[
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' }
              ]}
            />
            <FormInput.MultiSelect
              name="colorMulti"
              label="Color Multi"
              placeholder="Select Multiple Colors"
              items={[
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' }
              ]}
            />
            <FormInput.TextArea name="description" label="Description" />
            <FormInput.MultiTypeInput
              name="job"
              label="Job"
              selectItems={[
                { label: 'Software Engineer', value: 'SE' },
                { label: 'Quality Engineer', value: 'QE' }
              ]}
            />
            <FormInput.MultiTextInput name="jobDesc1" label="Job Desc 1" />
            <FormInput.MultiTextInput name="jobDec2" placeholder="Job Desc" label="Job Desc 2" />
            <FormInput.MultiSelectTypeInput
              name="hobbies"
              label="Hobbies"
              selectItems={[
                { label: 'Basket Ball', value: 'BBall' },
                { label: 'Drawing', value: 'Drawing' }
              ]}
            />
            <FormInput.CategorizedSelect
              name="sportsAndPokemon"
              label="Sports and Pokemon"
              items={[
                { label: 'BBall', value: 'bball', category: 'Sports' },
                { label: 'Soccer', value: 'soccer', category: 'Sports' },
                { label: 'Football', value: 'football', category: 'Sports' },
                { label: 'Pikachu', value: 'pikachu', category: 'Pokemon' },
                { label: 'Garchomp', value: 'garchomp', category: 'Pokemon' }
              ]}
              categorizedSelectProps={{
                items: [],
                creatableOption: {
                  creatableOptionLabel: 'Custom Option',
                  allowableCategoriesForNewOption: () => ['Sports', 'Pokemon']
                }
              }}
            />
            <FormInput.MultiInput name="multiInput" label="Multi Input" />
            <Button intent="primary" type="submit" text="Submit" />
          </FormikForm>
        )
      }}
    </Formik>
  </Container>
)
