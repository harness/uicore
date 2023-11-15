/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Stepper } from './Stepper'
import { StepperProps } from './Stepper.types'
import { StepList } from './__tests__/Stepper.mock'
import { omit } from 'lodash-es'

export default {
  title: 'Components / Stepper',

  component: Stepper,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>StepsProgress</Title>
            <Subtitle>
              <pre>
                <code>{`import {Stepper} from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta
export const Basic: Story<StepperProps> = args => {
  const { id = 'createSLOTabs', isStepValid = () => true, runValidationOnMount = false, stepList = StepList } = args
  const argsCopy = omit(args, ['steps', 'intent', 'current', 'currentStatus'])
  return (
    <Stepper
      id={id}
      isStepValid={isStepValid}
      runValidationOnMount={runValidationOnMount}
      stepList={stepList}
      {...argsCopy}
    />
  )
}
export const StepperWithAllValidSteps: Story<StepperProps> = args => {
  const { id = 'createSLOTabs', isStepValid = () => true, runValidationOnMount = false, stepList = StepList } = args
  const argsCopy = omit(args, ['id', 'isStepValid', 'runValidationOnMount', 'stepList'])
  return (
    <Stepper
      id={id}
      isStepValid={isStepValid}
      runValidationOnMount={runValidationOnMount}
      stepList={stepList}
      {...argsCopy}
    />
  )
}

export const ValidateStepOnNext: Story<StepperProps> = args => {
  const { id = 'createSLOTabs', isStepValid = () => false, runValidationOnMount = false, stepList = StepList } = args
  const argsCopy = omit(args, ['id', 'isStepValid', 'runValidationOnMount', 'stepList'])
  return (
    <Stepper
      id={id}
      isStepValid={isStepValid}
      runValidationOnMount={runValidationOnMount}
      stepList={stepList}
      {...argsCopy}
    />
  )
}

export const ValidateAllStepsOnMount: Story<StepperProps> = args => {
  const { id = 'createSLOTabs', isStepValid = () => false, runValidationOnMount = true, stepList = StepList } = args
  const argsCopy = omit(args, ['id', 'isStepValid', 'runValidationOnMount', 'stepList'])
  return (
    <Stepper
      id={id}
      isStepValid={isStepValid}
      runValidationOnMount={runValidationOnMount}
      stepList={stepList}
      {...argsCopy}
    />
  )
}

export const StepperWithSkippedSteps: Story<StepperProps> = args => {
  const StepListWithSkippedStep = [...StepList]
  StepListWithSkippedStep[1] = {
    ...StepListWithSkippedStep[1],
    disabled: true
  }
  const {
    id = 'createSLOTabs',
    isStepValid = () => true,
    runValidationOnMount = true,
    stepList = StepListWithSkippedStep
  } = args
  const argsCopy = omit(args, ['id', 'isStepValid', 'runValidationOnMount', 'stepList'])
  return (
    <Stepper
      id={id}
      isStepValid={isStepValid}
      runValidationOnMount={runValidationOnMount}
      stepList={stepList}
      {...argsCopy}
    />
  )
}
