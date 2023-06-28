/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Button } from '../../Button/Button'
import { Layout } from '../../../layouts/Layout'
import { GotoStepArgs, StepWizard } from '../StepWizard'

import './StepWizardExample.css'
import { Icon } from '@harness/icons'
import { Color } from '@harness/design-system'
import { useToggleOpen } from '../../../hooks/useToggle'
import { Dialog } from '../../../components/Dialog/Dialog'
// For Example only defining this props , reason is the module loader over here has some type issue

interface StepData {
  name: string | JSX.Element
}

interface StepProps<PrevStepData> {
  name?: string | JSX.Element
  // These props will be passed by wizard
  subTitle?: string | JSX.Element
  prevStepData?: PrevStepData
  currentStep?: () => number
  totalSteps?: () => number
  nextStep?: (data?: PrevStepData) => void
  previousStep?: (data?: PrevStepData) => void
  gotoStep?: (args: GotoStepArgs<PrevStepData>) => boolean
  firstStep?: (data?: PrevStepData) => void
  lastStep?: (data?: PrevStepData) => void
}

export const ExampleStep: React.FC<StepProps<StepData>> = props => {
  const totalSteps = props.totalSteps?.()
  const currentStep = props.currentStep?.()
  return (
    <React.Fragment>
      <Layout.Vertical height={'100%'}>
        <div style={{ height: '100%' }}>
          {props.name}: {currentStep}
          <div>Previous Step: {props.prevStepData && props.prevStepData.name}</div>
        </div>
        <div style={{ height: '40px' }}>
          <Button
            disabled={currentStep === 1}
            onClick={() => props.previousStep?.({ name: props.name || '' })}
            text="Previous"
          />
          <Button
            intent="primary"
            style={{ float: 'right' }}
            onClick={() => props.nextStep?.({ name: props.name || '' })}
            text={currentStep === totalSteps ? 'Submit' : 'Next'}
          />
        </div>
      </Layout.Vertical>
    </React.Fragment>
  )
}

export const ExampleWizard = (): JSX.Element => {
  const [counter, setCounter] = React.useState(1)
  return (
    <StepWizard
      icon={<Icon name="advanced" size={50} />}
      watermarkLogo={<Icon name="advanced" size={346} color={Color.GREY_50} />}
      title="Kubernetes Cluster"
      onStepChange={() => {
        setCounter(counter + 1)
      }}
      // eslint-disable-next-line no-alert
      onCompleteWizard={(arg: { name?: string } | undefined) => window.alert(`Wizard Complete with ${arg?.name}`)}>
      <ExampleStep name="Create a New Project" />
      <ExampleStep name={`New Project - ${counter}`} />
      <ExampleStep name="Collaborator" />
    </StepWizard>
  )
}

export const ModalExample = () => {
  const { isOpen, open, close } = useToggleOpen()
  const style: React.CSSProperties = {
    width: 1000,
    height: 600,
    border: 0,
    padding: 0,
    position: 'relative',
    overflow: 'hidden'
  }

  return (
    <React.Fragment>
      <Button text="Open Step Wizard" onClick={open} />
      <Dialog style={style} isOpen={isOpen} onClose={close}>
        <ExampleWizard />
      </Dialog>
    </React.Fragment>
  )
}
