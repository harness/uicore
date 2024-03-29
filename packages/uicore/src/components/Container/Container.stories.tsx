/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Container, Heading, Text, Button, Link, Layout, Label, TextInput } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { ContainerProps } from '../Container/Container'

export default {
  title: 'Components / Container',

  component: Container,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Container</Title>

            <Subtitle>
              <pre>
                <code>{`import { Container }  from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>
              {`Outline Colors (dark, light, red, green, etc....) are available only under NextGen UI (not available under wingsui).`}
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
export const Basic: Story<ContainerProps> = args => {
  return (
    <>
      <Container
        id="sample-container-1"
        intent="warning"
        padding="medium"
        font={{
          align: 'center'
        }}
        background="yellow100"
        flex
        border={{
          color: 'yellow500'
        }}
        {...args}>
        <Text>The quick brown fox jumps over the lazy dog</Text>
        <Button icon="cross" minimal />
      </Container>
    </>
  )
}
export const Example1: Story<ContainerProps> = args => {
  return (
    <Container
      id="sample-container-2"
      padding="small"
      border={{
        color: 'grey300'
      }}
      flex
      {...args}>
      <Link href="/workflow/123" font={{ size: 'medium' }}>
        Demo Workflow
      </Link>
      <Layout.Horizontal>
        <Button minimal icon="power" color="red500" disabled />
        <Button minimal icon="star-empty" />
        <Button minimal icon="share" />
        <Button minimal icon="more" />
      </Layout.Horizontal>
    </Container>
  )
}

export const Example2: Story<ContainerProps> = args => {
  return (
    <Container flex id="sample-container-3" {...args}>
      <Container width="30%" height="100px" background="red500" {...args}></Container>
      <Container width="30%" height="150px" background="green500" {...args}></Container>
      <Container width="30%" height="200px" background="blue500" {...args}></Container>
    </Container>
  )
}
export const OutlineColors: Story<ContainerProps> = args => {
  return (
    <Layout.Vertical spacing="medium">
      <Text>
        Outline Colors (dark, light, red, green, etc....) are available only under NextGen UI (not available under
        wingsui).
      </Text>
      <Layout.Horizontal spacing="medium">
        <Container border={{ color: 'dark' }} {...args}></Container>
        <Container border={{ color: 'light' }} {...args}></Container>
        <Container border={{ color: 'red' }} {...args}></Container>
        <Container border={{ color: 'green' }} {...args}></Container>
        <Container border={{ color: 'blue' }} {...args}></Container>
        <Container border={{ color: 'yellow' }} {...args}></Container>
        <Container border={{ color: 'orange' }} {...args}></Container>
        <Container border={{ color: 'teal' }} {...args}></Container>
        <Container border={{ color: 'purple' }} {...args}></Container>
      </Layout.Horizontal>
    </Layout.Vertical>
  )
}

export const FormContainers: Story<ContainerProps> = args => {
  return (
    <>
      <Container
        id="sample-container-form"
        padding="form"
        background="form"
        // flex
        border={{
          color: 'grey500'
        }}
        {...args}>
        <Heading level={5} color="black">
          Section Header
        </Heading>
        <Container
          id="sample-container-form"
          padding="form-section"
          margin="form-section"
          background="form-section"
          // flex
          {...args}>
          <Container
            id="sample-container-form"
            padding="form-subsection"
            margin="form-subsection"
            background="form-subsection"
            // flex
            {...args}>
            <Heading level={6} color="black">
              Sub-Section Header
            </Heading>
            <Label>My Label</Label>
            <TextInput placeholder="Placeholder text" />
          </Container>

          <Container
            id="sample-container-form"
            padding="form-subsection"
            margin="form-subsection"
            background="form-subsection"
            // flex
            {...args}>
            <Heading level={6} color="black">
              Sub-Section Header
            </Heading>
            <Label>My Label</Label>
            <TextInput placeholder="Placeholder text" />
          </Container>
        </Container>
        <Heading level={5} color="black">
          Section Header
        </Heading>
        <Container
          id="sample-container-form"
          padding="form-section"
          margin="form-section"
          background="form-section"
          // flex
          {...args}>
          <Container
            id="sample-container-form"
            padding="form-subsection"
            margin="form-subsection"
            background="form-subsection"
            // flex
            {...args}>
            <Heading level={6} color="black">
              Sub-Section Header
            </Heading>

            <Label>My Label</Label>
            <TextInput placeholder="Placeholder text" />
            <Label>My Label</Label>
            <TextInput placeholder="Placeholder text" />
          </Container>
        </Container>
        <Container
          id="sample-container-form"
          // padding="form-subsection"
          margin="form-action-buttons"
          // background="form-subsection"
          // flex
          {...args}>
          <Button intent="primary">Submit</Button>
        </Container>
      </Container>
    </>
  )
}
OutlineColors.args = { width: 100, height: 100 }
