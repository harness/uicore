import React from 'react'
import { StepWizard, StepProps } from './StepWizard'
import { Layout } from '../../layouts/Layout'
import { Button } from '../Button/Button'
import { render, fireEvent, wait, queryByText, waitForElement } from '@testing-library/react'

interface SharedObject {
  prevStepName: string
}

const ExampleStep: React.FC<StepProps<SharedObject>> = props => {
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

interface ExampleProps {
  initialStep: number
  stepChange: (data: any) => void
  onSubmit: (data: any) => void
}

const ExampleWizard = ({ initialStep, stepChange, onSubmit }: ExampleProps) => {
  const [counter, setCounter] = React.useState(1)
  return (
    <div>
      Steps Changed: {counter}
      <StepWizard
        icon="app-kubernetes"
        iconProps={{ size: 37 }}
        title="Kubernetes Cluster"
        initialStep={initialStep}
        onStepChange={values => {
          setCounter(prevState => ++prevState)
          stepChange(values)
        }}
        onCompleteWizard={onSubmit}>
        <ExampleStep name="Create a New Project" />
        <ExampleStep name={`New Project ${counter}`} />
        <ExampleStep name="Collaborator" />
      </StepWizard>
    </div>
  )
}

const getDefaultProps = (initialStep: number) => ({ initialStep, stepChange: jest.fn(), onSubmit: jest.fn() })

describe('REnder basic Step Wizard', () => {
  test('should render with initial step 1', async () => {
    const { container } = render(<ExampleWizard {...getDefaultProps(0)} />)
    await wait()
    expect(container).toMatchSnapshot()
  })
  test('should render with initial step -1, render step 1', async () => {
    const { container } = render(<ExampleWizard {...getDefaultProps(-1)} />)
    await wait()
    expect(queryByText(container, /Create a New Project: 1/)).toBeDefined()
  })
  test('should render with initial step 200, render step 1', async () => {
    const { container } = render(<ExampleWizard {...getDefaultProps(200)} />)
    await wait()
    expect(queryByText(container, /Create a New Project: 1/)).toBeDefined()
  })

  test('should render with initial step 2, render Step 2', async () => {
    const { container } = render(<ExampleWizard {...getDefaultProps(2)} />)
    await wait()
    expect(queryByText(container, /New Project: 2/)).toBeDefined()
  })

  test('should test Prev and Next Step', async () => {
    const props = getDefaultProps(1)
    const { container } = render(<ExampleWizard {...props} />)
    await wait()
    fireEvent.click(queryByText(container, /Next/) as HTMLDivElement)
    await wait()
    expect(props.stepChange).toHaveBeenLastCalledWith({
      nextStep: 2,
      prevStep: 1,
      prevStepData: {
        prevStepName: 'Create a New Project'
      }
    })
    fireEvent.click(queryByText(container, /Next/) as HTMLDivElement)
    await waitForElement(() => queryByText(container, /New Project 3/) as HTMLDivElement)
    expect(queryByText(container, /Collaborator: 3/)).not.toBeNull()
    expect(queryByText(container, /Last Step: New Project 2/)).not.toBeNull()

    expect(props.stepChange).toHaveBeenLastCalledWith({
      nextStep: 3,
      prevStep: 2,
      prevStepData: {
        prevStepName: 'New Project 2'
      }
    })

    fireEvent.click(queryByText(container, /Next/) as HTMLDivElement)

    await wait()

    expect(props.onSubmit).toHaveBeenLastCalledWith({
      prevStepName: 'Collaborator'
    })
    await wait()

    fireEvent.click(queryByText(container, /Previous/) as HTMLDivElement)
    await wait()

    expect(props.stepChange).toHaveBeenLastCalledWith({
      nextStep: 2,
      prevStep: 3,
      prevStepData: {
        prevStepName: 'Collaborator'
      }
    })
    fireEvent.click(queryByText(container, /Previous/) as HTMLDivElement)
    await wait()

    expect(props.stepChange).toHaveBeenLastCalledWith({
      nextStep: 1,
      prevStep: 2,
      prevStepData: {
        prevStepName: 'New Project 4'
      }
    })
    expect(queryByText(container, /Create a New Project: 1/)).not.toBeNull()
    expect(queryByText(container, /Last Step: New Project 4/)).not.toBeNull()
  })
})
