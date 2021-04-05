import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { OverlaySpinner, OverlaySpinnerProps, Layout, Text } from '../..'
import { omit } from 'lodash-es'

export default {
  title: 'Components / OverlaySpinner',

  component: OverlaySpinner,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>OverlaySpinner</Title>
            <Subtitle>
              <pre>
                <code>{`import {OverlaySpinner} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{`Adds [Blueprint spinner](https://blueprintjs.com/docs/#core/components/spinner) to the overlay and blocks the user interaction
`}</Description>

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
export const Basic: Story<OverlaySpinnerProps> = args => {
  const { show = true } = args
  const argsCopy = omit(args, ['show'])
  return (
    <OverlaySpinner show={show} {...argsCopy}>
      <Layout.Vertical id="text-font-size">
        <Text>The quick brown fox jumps over the lazy dog</Text>

        <Text font="small">The quick brown fox jumps over the lazy dog</Text>
        <Text font="normal">The quick brown fox jumps over the lazy dog</Text>
        <Text font="medium">The quick brown fox jumps over the lazy dog</Text>
        <Text font="large">The quick brown fox jumps over the lazy dog</Text>
      </Layout.Vertical>
    </OverlaySpinner>
  )
}
