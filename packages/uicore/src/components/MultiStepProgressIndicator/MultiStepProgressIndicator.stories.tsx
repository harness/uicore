/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Primary } from '@storybook/addon-docs/blocks'
import { Text } from '../..'

import { MultiStepProgressIndicator, MultiStepProgressIndicatorProps } from './MultiStepProgressIndicator'

export default {
  title: 'Components / MultiStepProgressIndicator',
  component: MultiStepProgressIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Multi-Step Progress Indicator</Title>
            This component renders sequential step progress.
            <Primary />
            <Text style={{ fontWeight: 'bold' }}>Data Interface</Text>
            <pre>
              <code>{`type StepStatus = 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'`}</code>
              <br />
              <br />
              <code>
                {`interface MultiStepProgressIndicatorProps {
  progressMap: Map<number, {StepStatus:'',StepName:''}>
  
}
`}
              </code>
            </pre>
          </>
        )
      }
    }
  }
} as Meta

export const MultiStepProgressIndicatorComp: Story<MultiStepProgressIndicatorProps> = args => (
  <MultiStepProgressIndicator {...args} />
)

MultiStepProgressIndicatorComp.args = {
  progressMap: new Map([
    [0, { StepStatus: 'SUCCESS', StepName: 'Workload' }],
    [1, { StepStatus: 'SUCCESS', StepName: 'Artifact' }],
    [2, { StepStatus: 'INPROGRESS', StepName: 'Infrastructure' }],
    [3, { StepStatus: 'TODO', StepName: 'Pipeline' }]
  ])
}
