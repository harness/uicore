import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'

import { Color } from '../../core/Color'
import { Text } from '../..'

import { WeightedStack, WeightedStackProps } from './WeightedStack'

export default {
  title: 'Components / WeightedStack',
  component: WeightedStack,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Weighted Stack</Title>
            <Subtitle>
              <pre>
                <code>{`import {WeightedStack} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            This component renders horizontally stacked bars. Bars are in a weighted-average proportion of their values.
            <pre>
              <code>
                w<sub>i</sub> = x<sub>i</sub> / ∑ x<sub>i</sub>&nbsp;where x<sub>0</sub>, x<sub>1</sub>, x<sub>2</sub>
                ... are weights(or values) of bars
              </code>
            </pre>
            <Text style={{ fontWeight: 'bold' }}>Data Interface</Text>
            <pre>
              <code>
                {`interface WeightedStackData {
  label: string
  value: number
  color?: Color
}`}
              </code>
            </pre>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </>
        )
      }
    }
  }
} as Meta

export const WeightedStackComp: Story<WeightedStackProps> = args => <WeightedStack {...args} />

WeightedStackComp.args = {
  data: [
    { label: 'SSH', value: 8, color: Color.BLUE_450 },
    { label: 'Kubernetes', value: 10, color: Color.BLUE_500 },
    { label: 'Helm', value: 6, color: Color.BLUE_700 },
    { label: 'PCF', value: 3, color: Color.BLUE_900 }
  ]
}
