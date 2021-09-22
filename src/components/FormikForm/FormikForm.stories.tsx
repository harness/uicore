import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { noop } from 'lodash-es'
import * as Yup from 'yup'

import { Formik, FormikForm, FormInput } from '../FormikForm/FormikForm'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { FormikFormProps } from 'formik'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'

export default {
  title: 'Form / FormikForm',
  component: FormikForm
} as Meta

const getSampleTooltip = () => {
  return ' If the image location is not specified in your Deployment manifest, you can add the image location to Harness as an Artifact. Next, you reference the Artifact you added to Harness in your manifest like this: `image: <+artifact.image>` [Learn More](https://ngdocs.harness.io/article/4ifq51cp0i)'
}

export const Basic: Story<FormikFormProps> = () => (
  <Container width={400} margin={{ left: 'large' }}>
    <Formik
      formName="formikFormBasic"
      initialValues={{
        name: '',
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
            <FormInput.Text
              name="name"
              label={
                <HarnessDocTooltip contentFromParent={getSampleTooltip()} labelText="Name" tooltipId="nameTextField" />
              }
              placeholder="First Name"
              tooltipProps={{
                dataTooltipId: 'nameTextField'
              }}
            />
            <FormInput.Text
              name="age"
              inputGroup={{ type: 'number' }}
              label="Age"
              isOptional
              placeholder="Age in years"
              tooltipProps={{
                dataTooltipId: 'ageNumberField'
              }}
            />
            <FormInput.KVTagInput
              name="tags"
              label="Tags"
              isArray={true}
              tooltipProps={{
                dataTooltipId: 'tagInputId'
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
            <FormInput.CheckBox
              name="specialPerson"
              label="VVIP"
              tooltipProps={{
                dataTooltipId: 'checkboxField'
              }}
            />
            <FormInput.Toggle name="toggle" label="Toggle" tooltipProps={{ dataTooltipId: 'toggleField' }} />
            <FormInput.FileInput
              name="picture"
              label="Upload Picture"
              buttonText="Select"
              tooltipProps={{
                dataTooltipId: 'uploadPictureField'
              }}
            />
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
                { label: 'Blue', value: 'blue' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
            />
            <FormInput.MultiSelect
              name="colorMulti"
              label="Color Multi"
              placeholder="Select Multiple Colors"
              items={[
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
            />
            <FormInput.TextArea name="description" label="Description" />
            <FormInput.MultiTypeInput
              name="job"
              label="Job"
              selectItems={[
                { label: 'Software Engineer', value: 'SE' },
                { label: 'Quality Engineer', value: 'QE' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
              useValue
              multiTypeInputProps={{
                selectProps: {
                  addClearBtn: true,
                  items: [
                    { label: 'Software Engineer', value: 'SE' },
                    { label: 'Quality Engineer', value: 'QE' },
                    {
                      label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                      value: 'xyz'
                    },
                    { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
                  ]
                }
              }}
            />
            <FormInput.DropDown
              name="values"
              label="DropDown"
              items={[
                { label: 'BBall', value: 'bball' },
                { label: 'Soccer', value: 'soccer' },
                { label: 'Football', value: 'football' },
                { label: 'Pikachu', value: 'pikachu' },
                { label: 'Garchomp', value: 'garchomp' }
              ]}
              dropDownProps={{
                filterable: false,
                isLabel: true
              }}
            />
            <FormInput.MultiTextInput name="jobDesc1" label="Job Desc 1" />
            <FormInput.MultiTextInput name="jobDec2" placeholder="Job Desc" label="Job Desc 2" />
            <FormInput.MultiSelectTypeInput
              name="hobbies"
              label="Hobbies"
              selectItems={[
                { label: 'Basket Ball', value: 'BBall' },
                { label: 'Drawing', value: 'Drawing' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
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

export const RadioGroups: Story<FormikFormProps> = () => (
  <Formik onSubmit={() => undefined} formName="radioButtons" initialValues={{}}>
    <FormikForm>
      <FormInput.RadioGroup
        name="example1"
        label="Basic"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        inline
        name="example2"
        label="Inline form input"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        radioGroup={{ inline: true }}
        name="example3"
        label="Inline RadioGroup"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        inline
        radioGroup={{ inline: true }}
        name="example4"
        label="Inline both"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />
    </FormikForm>
  </Formik>
)
