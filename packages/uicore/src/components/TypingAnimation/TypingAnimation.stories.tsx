/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import TypingAnimation from './TypingAnimation'
import { Layout, Container } from '../..'
import { FontVariation } from '@harness/design-system'

export default {
  title: 'Components / TypingAnimation',

  component: TypingAnimation,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>TypingAnimation</Title>
            <Subtitle>
              <pre>
                <code>{`import {TypingAnimation} from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{`TypingAnimation creates a typewriter effect for displaying text. It's useful for chat interfaces, loading states, or any scenario where you want to gradually reveal text to the user.`}</Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [
    Story => (
      <Layout.Vertical spacing="large">
        <Story />
      </Layout.Vertical>
    )
  ]
} as Meta

export const Basic: Story = args => {
  return (
    <Container width={400}>
      <TypingAnimation text="Hello, I'm a typing animation component!" {...args} />
    </Container>
  )
}

export const WithDelay: Story = args => {
  return (
    <Container width={400}>
      <TypingAnimation text="This animation starts after a delay..." delay={1000} {...args} />
    </Container>
  )
}

export const DifferentSpeeds: Story = () => {
  return (
    <Layout.Vertical spacing="medium">
      <Container width={400}>
        <TypingAnimation text="Fast typing speed (25ms)" typingSpeed={25} />
      </Container>
      <Container width={400}>
        <TypingAnimation text="Normal typing speed (50ms)" typingSpeed={50} />
      </Container>
      <Container width={400}>
        <TypingAnimation text="Slow typing speed (100ms)" typingSpeed={100} />
      </Container>
    </Layout.Vertical>
  )
}

export const DifferentFontStyles: Story = () => {
  return (
    <Layout.Vertical spacing="medium">
      <Container width={400}>
        <TypingAnimation text="Headline text with typing animation" font={{ variation: FontVariation.H3 }} />
      </Container>
      <Container width={400}>
        <TypingAnimation text="Body text with typing animation" font={{ variation: FontVariation.BODY }} />
      </Container>
      <Container width={400}>
        <TypingAnimation text="Small text with typing animation" font={{ variation: FontVariation.SMALL }} />
      </Container>
    </Layout.Vertical>
  )
}

export const LongText: Story = args => {
  return (
    <Container width={600}>
      <TypingAnimation
        text="This is a much longer text that demonstrates how the typing animation works with paragraphs. The animation will type out each character one by one, creating a realistic typing effect that can be used in various UI scenarios like chat interfaces or interactive tutorials."
        {...args}
      />
    </Container>
  )
}
