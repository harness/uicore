import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Heading, Container } from '../..'
import { HeadingProps } from '../Heading/Heading'
import { FontVariation } from '../../styled-props/font/FontProps'

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
                <code>{`import {Heading} from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>
              Heading renders H1 to H6 tag based on &apos;level&apos; prop. It supports all [Styled
              Props](/styled-props).
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
export const Weights: Story<HeadingProps> = () => {
  return (
    <>
      <Heading level={1} font={{ variation: FontVariation.H1 }}>
        Headline Text - H1/Bold - Module Landing Title
      </Heading>
      <Heading level={1} font={{ variation: FontVariation.H1_SEMI }}>
        Headline Text - H1/Semi - Semi Bold
      </Heading>
      <Heading level={2} font={{ variation: FontVariation.H2 }}>
        Headline Text - H2
      </Heading>
      <Heading level={3} font={{ variation: FontVariation.H3 }}>
        Headline Text - H3 - Dialogue Title
      </Heading>
      <Heading level={4} font={{ variation: FontVariation.H4 }}>
        Headline Text - H4 - Page Header Title/Landing/Listing Page Empty State Title
      </Heading>
      <Heading level={5} font={{ variation: FontVariation.H5 }}>
        Headline Text - H5 - Form/Section Title
      </Heading>
      <Heading level={6} font={{ variation: FontVariation.H6 }}>
        Headline Text - H6 - Section Title
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
      <Heading level={5} color="black" {...args}>
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={6} color="black" {...args}>
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
