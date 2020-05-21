import React from 'react'
import { StepWizard, StepProps } from './StepWizard'
import { Layout } from '../../layouts/Layout'
import { Button } from '../Button/Button'
import { render, fireEvent, wait, queryByText } from '@testing-library/react'

interface SharedObject {
  prevStepName: string
}

const ExampleStep: React.FC<StepProps<SharedObject>> = props => {
  const totalSteps = props.totalSteps && props.totalSteps()
  const currentStep = props.currentStep && props.currentStep()
  return (
    <React.Fragment>
      <Layout.Vertical>
        <div style={{ height: '180px' }}>
          {props.name}: {currentStep}
          <div>Last Step: {props.prevStepData && props.prevStepData.prevStepName}</div>
        </div>
        <div style={{ height: '40px' }}>
          <Button
            disabled={currentStep === 1}
            onClick={() => props.previousStep && props.previousStep({ prevStepName: props.name || '' })}
            text="Previous"
          />
          <Button
            disabled={currentStep === totalSteps}
            intent="primary"
            style={{ float: 'right' }}
            onClick={() => props.nextStep && props.nextStep({ prevStepName: props.name || '' })}
            text="Next"
          />
        </div>
      </Layout.Vertical>
    </React.Fragment>
  )
}

const ExampleWizard: React.FC<{ initialStep: number }> = ({ initialStep }) => {
  const [counter, setCounter] = React.useState(1)
  return (
    <div>
      Steps Changed: {counter}
      <StepWizard initialStep={initialStep} onStepChange={() => setCounter(prevState => ++prevState)}>
        <ExampleStep name="Create a New Project">Step 1</ExampleStep>
        <ExampleStep name={`New Project ${counter}`}>Step 2</ExampleStep>
        <ExampleStep name="Collaborator">Step 3</ExampleStep>
      </StepWizard>
    </div>
  )
}

describe('REnder basic Step Wizard', () => {
  test('should render with initial step 1', async () => {
    const { container } = render(<ExampleWizard initialStep={0} />)
    await wait()
    expect(container).toMatchSnapshot()
  })
  test('should render with initial step -1, render step 1', async () => {
    const { container } = render(<ExampleWizard initialStep={-1} />)
    await wait()
    expect(queryByText(container, /Create a New Project: 1/)).toBeDefined()
  })
  test('should render with initial step 200, render step 1', async () => {
    const { container } = render(<ExampleWizard initialStep={200} />)
    await wait()
    expect(queryByText(container, /Create a New Project: 1/)).toBeDefined()
  })

  test('should render with initial step 2, render Step 2', async () => {
    const { container } = render(<ExampleWizard initialStep={2} />)
    await wait()
    expect(queryByText(container, /New Project: 2/)).toBeDefined()
  })

  test('should test Prev and Next Step', async () => {
    const { container } = render(<ExampleWizard initialStep={200} />)
    await wait()
    fireEvent.click(queryByText(container, /Next/) as HTMLDivElement)
    await wait()
    fireEvent.click(queryByText(container, /Next/) as HTMLDivElement)
    await wait()
    expect(queryByText(container, /Collaborator: 3/)).not.toBeNull()
    expect(queryByText(container, /Last Step: New Project 2/)).not.toBeNull()
    await wait()
    fireEvent.click(queryByText(container, /Previous/) as HTMLDivElement)
    await wait()
    fireEvent.click(queryByText(container, /Previous/) as HTMLDivElement)
    await wait()
    expect(queryByText(container, /Create a New Project: 1/)).not.toBeNull()
    expect(queryByText(container, /Last Step: New Project 4/)).not.toBeNull()
  })
})
