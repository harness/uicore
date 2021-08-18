/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { ExampleWizard, ExampleStep, ModalExample } from './example/StepWizardExample'
import { Text } from '../Text/Text'
import { StepWizard } from './StepWizard'
import { Color } from '../../core/Color'

export default {
  title: 'Components / Step Wizard',
  component: ExampleWizard
} as Meta

export const Basic: Story<void> = _args => (
  <StepWizard icon="app-kubernetes" iconProps={{ size: 50 }} title="Kubernetes Cluster">
    <ExampleStep name="Create a New Project" />
    <ExampleStep name={`New Project`} />
    <ExampleStep name="Collaborator" />
  </StepWizard>
)

export const FullExample: Story<void> = _args => <ExampleWizard />

export const ModalStepExample: Story<void> = _args => <ModalExample />

export const Nested: Story<void> = _args => (
  <StepWizard
    title="Kubernetes Cluster"
    subtitle={
      <Text
        style={{ marginLeft: 24, marginTop: 'var(--spacing-6)' }}
        icon="service-dockerhub"
        iconProps={{ color: Color.WHITE, size: 26 }}
        color={Color.WHITE}>
        Docker subtitle
      </Text>
    }>
    <ExampleStep name="Artifact Repository Type" />

    <ExampleStep name={`New Project`} />
    <StepWizard
      title="Create new Connector"
      onCompleteWizard={arg => console.log('onCompleteWizard', arg)}
      onStepChange={arg => console.log('Step Change', arg)}>
      <ExampleStep name="Overview" />
      <ExampleStep name="Details" />
      <ExampleStep name="Test Connection" />
    </StepWizard>
    <ExampleStep name="Collaborator" />
    <StepWizard
      onCompleteWizard={arg => console.log('onCompleteWizard', arg)}
      onStepChange={arg => console.log('Step Change', arg)}>
      <ExampleStep
        name={
          <Text icon="service-dockerhub" iconProps={{ color: Color.WHITE, size: 26 }} color={Color.WHITE}>
            Docker Registry
          </Text>
        }
      />
    </StepWizard>
    <ExampleStep name="Final Step" />
  </StepWizard>
)

export const NestedChildSteps: Story<void> = _args => (
  <StepWizard title="Kubernetes Cluster">
    <ExampleStep name="Artifact Repository Type" />
    <div>
      <StepWizard
        onCompleteWizard={arg => console.log('onCompleteWizard', arg)}
        onStepChange={arg => console.log('Step Change', arg)}>
        <ExampleStep name={'Docker Registry'} />
      </StepWizard>
    </div>
    <ExampleStep name={`New Project`} />
    <StepWizard
      title="Create new Connector"
      onCompleteWizard={arg => console.log('onCompleteWizard', arg)}
      onStepChange={arg => console.log('Step Change', arg)}>
      <ExampleStep name="Overview" />
      <ExampleStep name="Details" />
      <ExampleStep name="Test Connection" />
    </StepWizard>
    <ExampleStep name="Collaborator" />
  </StepWizard>
)
