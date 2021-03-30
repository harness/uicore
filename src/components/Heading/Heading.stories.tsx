import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Heading, Container } from '../..'
import { HeadingProps } from '../Heading/Heading'

export default {
  title: 'Components / Heading',

  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Heading</Title>
            <Subtitle>
              <pre>
                <code>{`import {Heading} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>
              {`Heading renders H1 to H6 tag based on 'level' prop. It supports all [Styled Props](/styled-props).

At this moment, HDL defines four levels of heading (H1 to H4), H5 and H6 are not used.
`}
            </Description>

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
export const Weights: Story<HeadingProps> = args => {
  return (
    <>
      <Heading level={args.level ? args.level : 1} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 1} font={{ weight: 'bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 1} font={{ weight: 'semi-bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 1} font={{ weight: 'light' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>

      <Heading level={args.level ? args.level : 2} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 2} font={{ weight: 'bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 2} font={{ weight: 'semi-bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 2} font={{ weight: 'light' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>

      <Heading level={args.level ? args.level : 3} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 3} font={{ weight: 'bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 3} font={{ weight: 'semi-bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 3} font={{ weight: 'light' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>

      <Heading level={args.level ? args.level : 4} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 4} font={{ weight: 'bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 4} font={{ weight: 'semi-bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={args.level ? args.level : 4} font={{ weight: 'light' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
    </>
  )
}
export const Block: Story<HeadingProps> = args => {
  return (
    <>
      <Heading level={1} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={2} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={3} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={4} {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
    </>
  )
}
export const Inline: Story<HeadingProps> = args => {
  return (
    <>
      <Container id="heading-inline">
        <Heading level={1} inline {...args}>
          Heading Level 1
        </Heading>
        <Heading level={2} inline {...args}>
          Heading Level 2
        </Heading>
        <Heading level={3} inline {...args}>
          Heading Level 3
        </Heading>
        <Heading level={4} inline {...args}>
          Heading Level 4
        </Heading>
      </Container>
    </>
  )
}
export const Intent: Story<HeadingProps> = args => {
  return (
    <>
      <Heading intent="primary" {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading intent="success" {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading intent="warning" {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading intent="danger" {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
    </>
  )
}
export const CombiningWithOtherStyledProps: Story<HeadingProps> = args => {
  return (
    <>
      <Heading
        padding="small"
        font={{ size: 'large', align: 'center' }}
        border={{ color: 'green500' }}
        background="grey100"
        {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
    </>
  )
}
CombiningWithOtherStyledProps.args = {
  padding: 'small',
  font: { size: 'large', align: 'center' },
  border: { color: 'green500' },
  background: 'grey100'
}
