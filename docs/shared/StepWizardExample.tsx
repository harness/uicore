import React from 'react'
import { Button, StepWizard, Layout } from '../static/index'

//For Example only defining this props, reason is the module loader over here has some type issue

interface StepData {
  name: string
}

interface StepProps {
  name?: string
  // These props will be passed by wizard
  prevStepData?: StepData
  currentStep?: () => number
  totalSteps?: () => number
  nextStep?: (data: StepData) => void
  previousStep?: (data: StepData) => void
  gotoStep?: (stepNumber: number, data: StepData) => void
  firstStep?: (data: StepData) => void
  lastStep?: (data: StepData) => void
}

const ExampleStep: React.FC<StepProps> = props => {
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
            disabled={currentStep === totalSteps}
            intent="primary"
            style={{ float: 'right' }}
            onClick={() => props.nextStep({ name: props.name })}
            text="Next"
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
      <StepWizard onStepChange={() => setCounter(prevState => ++prevState)}>
        <ExampleStep name="Create a New Project">Step 1</ExampleStep>
        <ExampleStep name={`New Project - ${counter}`}>Step 2</ExampleStep>
        <ExampleStep name="Collaborator">Step 3</ExampleStep>
      </StepWizard>
    </div>
  )
}
