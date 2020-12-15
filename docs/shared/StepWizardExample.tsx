import React from 'react'
import { Button, StepWizard, Layout } from '../static/index'
import './StepWizardExample.css'
//For Example only defining this props, reason is the module loader over here has some type issue

interface StepData {
  name: string
}

interface StepProps<PrevStepData> {
  name?: string
  // These props will be passed by wizard
  prevStepData?: PrevStepData
  currentStep?: () => number
  totalSteps?: () => number
  nextStep?: (data?: PrevStepData) => void
  previousStep?: (data?: PrevStepData) => void
  gotoStep?: (stepNumber: number, data?: PrevStepData) => void
  firstStep?: (data?: PrevStepData) => void
  lastStep?: (data?: PrevStepData) => void
}

const ExampleStep: React.FC<StepProps<StepData>> = props => {
  const totalSteps = props.totalSteps()
  const currentStep = props.currentStep()
  return (
    <React.Fragment>
      <Layout.Vertical>
        <div style={{ height: '180px' }}>
          {props.name}: {currentStep}
          <div>Previous Step: {props.prevStepData && props.prevStepData.name}</div>
        </div>
        <div style={{ height: '40px' }}>
          <Button
            disabled={currentStep === 1}
            onClick={() => props.previousStep({ name: props.name })}
            text="Previous"
          />
          <Button
            intent="primary"
            style={{ float: 'right' }}
            onClick={() => props.nextStep({ name: props.name })}
            text={currentStep === totalSteps ? 'Submit' : 'Next'}
          />
        </div>
      </Layout.Vertical>
    </React.Fragment>
  )
}

export const ExampleWizard = () => {
  const [counter, setCounter] = React.useState(1)
  return (
    <div>
      Steps Changed: {counter}
      <StepWizard
        icon="app-kubernetes"
        iconProps={{ size: 50 }}
        title="Kubernetes Cluster"
        onStepChange={() => {
          setCounter(prevState => ++prevState)
        }}
        onCompleteWizard={({ name }) => alert(`Wizard Complete with ${name}`)}>
        <ExampleStep name="Create a New Project" />
        <ExampleStep name={`New Project - ${counter}`} />
        <ExampleStep name="Collaborator" />
      </StepWizard>
    </div>
  )
}
