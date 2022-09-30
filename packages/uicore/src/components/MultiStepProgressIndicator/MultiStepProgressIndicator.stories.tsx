/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
