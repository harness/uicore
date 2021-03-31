/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { DateRangePickerButton, DateRangePickerButtonProps, Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { omit } from 'lodash-es'

export default {
  title: 'Components / DateRangePickerButton',

  component: DateRangePickerButton,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>DateRangePickerButton</Title>

            <Subtitle>
              <pre>
                <code>{`import { DateRangePickerButton }  from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
            <Description>{`## Reference

This component is an extension of [Date range picker](https://blueprintjs.com/docs/#datetime/daterangepicker) from Blueprint. Feel free to look into the [docs](https://blueprintjs.com/docs/#datetime/daterangepicker.props) for more examples.
`}</Description>
          </>
        )
      }
    }
  },
  decorators: [
    Story => (
      <Layout.Horizontal spacing="large">
        <Story />
      </Layout.Horizontal>
    )
  ]
} as Meta
export const Basic: Story<DateRangePickerButtonProps> = args => {
  const onChange1 = args.onChange
    ? args.onChange
    : (selectedDates: any) => {
        alert(`${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`)
      }
  const initialButtonText1 = args.initialButtonText ? args.initialButtonText : 'Last 30 days'
  const initialButtonText2 = args.initialButtonText ? args.initialButtonText : 'Select Dates'
  const renderButtonText1 = args.renderButtonText
    ? args.renderButtonText
    : (selectedDates: any) => {
        return `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
      }
  const argsCopy = omit(args, ['onChange', 'initialButtonText', 'renderButtonText'])
  return (
    <>
      <DateRangePickerButton
        initialButtonText={initialButtonText1}
        renderButtonText={renderButtonText1}
        onChange={onChange1}
        {...argsCopy}
      />

      <DateRangePickerButton
        intent="primary"
        minimal={undefined}
        initialButtonText={initialButtonText2}
        renderButtonText={renderButtonText1}
        onChange={onChange1}
        {...argsCopy}
      />
    </>
  )
}
