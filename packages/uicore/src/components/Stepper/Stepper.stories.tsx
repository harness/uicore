/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
                <code>{`import {Stepper} from '@harnessio/uicore'`}</code>
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
