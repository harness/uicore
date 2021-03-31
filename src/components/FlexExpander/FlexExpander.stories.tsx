import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { FlexExpander, Container, Heading, Button } from '../..'

export default {
  title: 'Components / FlexExpander',

  component: FlexExpander,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>FlexExpander</Title>
            <Description>{`FlexExpander is a utility component. It stretches itself to consume the remaining space of its parent flex container.

## Props

- flexGrow (optional): Specify 'flex-grow' value. Defaulted to '1'.`}</Description>
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
export const Basic: Story<{ flexGrow?: number }> = args => {
  return (
    <>
      <Container flex>
        <Heading level={2}>Continuous Efficiency Dashboard</Heading>

        <FlexExpander {...args} />

        <Button minimal icon="power" color="red500" disabled />
        <Button minimal icon="star-empty" />
        <Button minimal icon="share" />
        <Button minimal icon="more" />
      </Container>
    </>
  )
}
