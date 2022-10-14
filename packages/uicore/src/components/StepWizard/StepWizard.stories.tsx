/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-console */
import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { ExampleWizard, ExampleStep, ModalExample, ExampleStepWithStepHideShow } from './example/StepWizardExample'
import { Text } from '../Text/Text'
import { StepWizard } from './StepWizard'
import { Color } from '@harness/design-system'

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
export const StepSubTitle: Story<void> = _args => (
  <StepWizard
    icon="app-kubernetes"
    iconProps={{ size: 50 }}
    title="Kubernetes Cluster"
    subtitle={'step wizard sub title'}>
    <ExampleStep name={' step title'} subTitle={'step sub title '} />
    <ExampleStep name={`New Project`} />
    <ExampleStep name="Collaborator" subTitle={'step sub title '} />
  </StepWizard>
)
export const FullExample: Story<void> = _args => <ExampleWizard />

export const ModalStepExample: Story<void> = _args => <ModalExample />

export const Nested: Story<void> = _args => (
  <StepWizard
    title="Kubernetes Cluster"
    subtitle={
      <Text style={{ marginLeft: 28, marginTop: 'var(--spacing-2)' }} color={Color.WHITE}>
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

export const NestedChildStepsWithDynamicSteps: Story<void> = _args => {
  const [showNewConnector, setShowNewConnector] = useState(false)
  const [showNewConnector2, setShowNewConnector2] = useState(false)
  return (
    <StepWizard title="Kubernetes Cluster">
      <ExampleStepWithStepHideShow
        name={`New Project`}
        setShowNewConnector={setShowNewConnector}
        isNewConnectorVisible={showNewConnector}
      />
      {showNewConnector ? (
        <StepWizard
          title="Create new Connector"
          onCompleteWizard={arg => console.log('onCompleteWizard', arg)}
          onStepChange={arg => console.log('Step Change', arg)}>
          <ExampleStepWithStepHideShow
            name="Overview"
            setShowNewConnector={setShowNewConnector}
            isNewConnectorVisible={showNewConnector}
          />
          <ExampleStepWithStepHideShow
            name="Details"
            setShowNewConnector={setShowNewConnector}
            isNewConnectorVisible={showNewConnector}
          />
          <ExampleStepWithStepHideShow
            name="Test Connection 1"
            setShowNewConnector={setShowNewConnector}
            isNewConnectorVisible={showNewConnector}
          />
          <ExampleStepWithStepHideShow
            name="Test Connection 2"
            setShowNewConnector={setShowNewConnector}
            isNewConnectorVisible={showNewConnector}
          />
          <ExampleStepWithStepHideShow
            name="Test Connection 3"
            setShowNewConnector={setShowNewConnector}
            isNewConnectorVisible={showNewConnector}
          />
        </StepWizard>
      ) : null}
      <ExampleStepWithStepHideShow
        name="Collaborator"
        setShowNewConnector={setShowNewConnector2}
        isNewConnectorVisible={showNewConnector2}
      />
      {showNewConnector2 ? (
        <StepWizard
          title="Create new Connector 2"
          onCompleteWizard={arg => console.log('onCompleteWizard', arg)}
          onStepChange={arg => console.log('Step Change', arg)}>
          <ExampleStepWithStepHideShow
            name="Overview"
            setShowNewConnector={setShowNewConnector2}
            isNewConnectorVisible={showNewConnector2}
          />
          <ExampleStepWithStepHideShow
            name="Details"
            setShowNewConnector={setShowNewConnector2}
            isNewConnectorVisible={showNewConnector2}
          />
          <ExampleStepWithStepHideShow
            name="Test Connection 1"
            setShowNewConnector={setShowNewConnector2}
            isNewConnectorVisible={showNewConnector2}
          />
          <ExampleStepWithStepHideShow
            name="Test Connection 2"
            setShowNewConnector={setShowNewConnector2}
            isNewConnectorVisible={showNewConnector2}
          />
          <ExampleStepWithStepHideShow
            name="Test Connection 3"
            setShowNewConnector={setShowNewConnector2}
            isNewConnectorVisible={showNewConnector2}
          />
        </StepWizard>
      ) : null}
    </StepWizard>
  )
}
