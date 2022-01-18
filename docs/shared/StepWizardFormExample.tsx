/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Formik, Form, connect, FormikContext } from 'formik'
import * as Yup from 'yup'
import data from './pokedex.json'
import {
  Button,
  StepWizard,
  Layout,
  CardSelect,
  Text,
  Icon,
  TextInput,
  Label,
  Select,
  MultiSelect
} from '../static/index'
import './StepWizardExample.css'
import { GotoStepArgs } from '../../src/components/StepWizard/StepWizard'

//For Example only defining this props, reason is the module loader over here has some type issue
/*----- Interface definition Starts here ---*/
interface StepProps<PrevStepData> {
  name?: string
  // These props will be passed by wizard
  prevStepData?: PrevStepData
  currentStep?: () => number
  totalSteps?: () => number
  nextStep?: (data?: PrevStepData) => void
  previousStep?: (data?: PrevStepData) => void
  gotoStep?: (args: GotoStepArgs<PrevStepData>) => boolean
  firstStep?: (data?: PrevStepData) => void
  lastStep?: (data?: PrevStepData) => void
}

enum ProjectTypes {
  NEW_PROJECT = 'New Project',
  CLONE_AN_EXISTING_PROJECT = 'Clone an existing Project',
  IMPORT_PROJECT = 'Import Project',
  BROWSE_MARKETPLACE = 'Browse sample projects from Marketplace'
}

interface FirstData {
  value: ProjectTypes
  icon: string
}

const firstStepData: FirstData[] = [
  {
    value: ProjectTypes.NEW_PROJECT,
    icon: 'main-folder-new'
  },
  {
    value: ProjectTypes.CLONE_AN_EXISTING_PROJECT,
    icon: 'main-clone'
  },
  {
    value: ProjectTypes.IMPORT_PROJECT,
    icon: 'main-folder-new'
  },
  {
    value: ProjectTypes.BROWSE_MARKETPLACE,
    icon: 'heat-grid'
  }
]

interface FormData {
  projectType?: ProjectTypes
  color?: SelectOption
  projectName?: string
  description?: string
  collaborators?: MultiSelectOption[]
}
interface SelectOption {
  label: string
  value: string | number | symbol
}

interface MultiSelectOption {
  label: string
  value: string | number | symbol
  disabled?: boolean
}

interface ConnectedProps {
  formik?: FormikContext<any>
  label: string
  name: string
  type?: string
  placeholder?: string
  isMultiSelect?: boolean
  items?: SelectOption[]
}

/*----- Interface definition Ends here ---*/

/*----- Define schema for forms ---*/

const secondFormSchema = Yup.object().shape({
  projectName: Yup.string().trim().required('Project Name is required field')
})

const thirdFormSchema = Yup.object().shape({
  collaborators: Yup.array()
    .of(Yup.object().shape({ label: Yup.string(), value: Yup.string() }))
    .min(1, 'Collaborators is required field')
    .required('Collaborators is required field')
})

/*----- Get Options for fields ---*/

const colorOptions: SelectOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' }
]

const collaborators: MultiSelectOption[] = data.map(row => ({
  label: row.name,
  value: row.id
}))

/*----- Define Select and Text Fields ---*/

const MySelectField = (props: ConnectedProps) => {
  const { formik, label, isMultiSelect = false, ...rest } = props
  const hasError = formik.touched[props.name] && formik.errors[props.name]

  return (
    <Layout.Vertical spacing="small">
      <Label>{props.label}</Label>
      {!isMultiSelect ? (
        <Select
          {...rest}
          value={formik.values[props.name]}
          intent={hasError ? 'danger' : ''}
          errorText={hasError ? formik.errors[props.name] : ''}
          onChange={value => formik.setFieldValue(props.name, value)}
        />
      ) : (
        <MultiSelect
          {...rest}
          value={formik.values[props.name]}
          intent={hasError ? 'danger' : ''}
          errorText={hasError ? formik.errors[props.name] : ''}
          onChange={value => formik.setFieldValue(props.name, value)}
        />
      )}
    </Layout.Vertical>
  )
}

const MyTextField = (props: ConnectedProps) => {
  const { formik, label, ...rest } = props
  const hasError = formik.touched[props.name] && formik.errors[props.name]

  return (
    <Layout.Vertical spacing="small">
      <Label>{props.label}</Label>
      <TextInput
        {...rest}
        value={formik.values[props.name]}
        intent={hasError ? 'danger' : ''}
        errorText={hasError ? formik.errors[props.name] : ''}
        onChange={event => formik.setFieldValue(props.name, event.target.value)}
      />
    </Layout.Vertical>
  )
}

/*----- Connect to Formik ---*/
const FormikField = connect(MyTextField)
const FormikSelect = connect(MySelectField)

/*----- Step 1 ---*/
const FirstStep = (props: StepProps<FormData>) => {
  const selected = props.prevStepData && props.prevStepData.projectType
  const radioProps = {
    data: firstStepData,
    className: 'customGrid',
    renderItem: (item, selected) => (
      <div>
        <Icon name={item.icon} size={32} padding="small" />
        <Text
          font={{ size: 'small' }}
          style={{
            color: selected ? 'var(--blue-800)' : 'parent',
            textTransform: 'uppercase',
            width: '110px',
            paddingTop: '7px'
          }}>
          {item.value}
        </Text>
      </div>
    ),
    onChange: (item: FirstData) => props.nextStep({ projectType: item.value })
  }
  return (
    <Layout.Vertical padding="small">
      <div style={{ height: '180px' }}></div>
      <Text font="large" padding="small" style={{ textTransform: 'uppercase' }}>
        Create A New Project
      </Text>
      <Text padding="small" style={{ textTransform: 'uppercase', color: 'var(--grey-400)' }}>
        Recommended
      </Text>
      <CardSelect {...radioProps} selected={selected && firstStepData.filter(data => data.value === selected)[0]} />
    </Layout.Vertical>
  )
}

/*----- Step 2 ---*/
const SecondStep = (props: StepProps<FormData>) => {
  return (
    <React.Fragment>
      <Layout.Vertical>
        <div style={{ height: '520px' }}>
          <Text padding="small" style={{ textTransform: 'uppercase', color: 'var(--grey-400)' }}>
            {props.prevStepData && props.prevStepData.projectType}
          </Text>
          <Formik
            initialValues={{ color: colorOptions[0], projectName: '', description: '', ...props.prevStepData }}
            validationSchema={secondFormSchema}
            onSubmit={values => {
              props.nextStep({ ...props.prevStepData, ...values })
            }}>
            {() => (
              <Form>
                <Layout.Vertical spacing="small">
                  <FormikField label="Project Name" type="text" name="projectName" placeholder="Project Name" />
                  <FormikField label="Description" type="text" name="description" placeholder="Description" />
                  <FormikSelect label="Color" name="color" items={colorOptions} />
                  <Layout.Horizontal spacing="small">
                    <Button onClick={() => props.previousStep(props.prevStepData)} text="Back" />
                    <Button type="submit" style={{ color: 'var(--blue-500)' }} text="Save and Continue" />
                  </Layout.Horizontal>
                </Layout.Vertical>
              </Form>
            )}
          </Formik>
        </div>
      </Layout.Vertical>
    </React.Fragment>
  )
}

/*----- Step 3 ---*/
const ThirdStep = (props: StepProps<FormData>) => {
  return (
    <React.Fragment>
      <Layout.Vertical>
        <div style={{ height: '520px' }}>
          <Text padding="small" style={{ textTransform: 'uppercase', color: 'var(--grey-400)' }}>
            {props.prevStepData && props.prevStepData.projectType}
          </Text>
          <Formik
            initialValues={{ collaborators: collaborators.slice(0, 3), ...props.prevStepData }}
            validationSchema={thirdFormSchema}
            onSubmit={values => {
              props.nextStep({ ...props.prevStepData, ...values })
            }}>
            {() => (
              <Form>
                <Layout.Vertical spacing="small">
                  <FormikSelect isMultiSelect={true} label="Collaborators" name="collaborators" items={collaborators} />
                  <Layout.Horizontal spacing="small">
                    <Button onClick={() => props.previousStep(props.prevStepData)} text="Back" />
                    <Button style={{ color: 'var(--blue-500)' }} type="submit" text="Save and Continue" />
                  </Layout.Horizontal>
                </Layout.Vertical>
              </Form>
            )}
          </Formik>
        </div>
      </Layout.Vertical>
    </React.Fragment>
  )
}

/*----- Now connect them using wizard ---*/

export const FormExampleStepWizard = () => {
  // Second Step name value comes from Step 1, so use state for it and when step changes
  const [secondStepName, setSecondStepName] = React.useState(ProjectTypes.NEW_PROJECT)

  const onCompleteWizard = values => {
    alert(JSON.stringify(values))
  }
  return (
    <StepWizard
      onCompleteWizard={onCompleteWizard}
      onStepChange={({ prevStep, prevStepData }) => prevStep === 1 && setSecondStepName(prevStepData.projectType)} // So if prev step is Step 1, then update the 2nd Step Name
      className={'example-wizard'}>
      <FirstStep name="Create a New Project" />
      <SecondStep name={secondStepName} />
      <ThirdStep name="Collaborator" />
    </StepWizard>
  )
}
