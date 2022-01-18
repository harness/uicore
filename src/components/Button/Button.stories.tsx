/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, Description, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Container, ButtonVariation, ButtonSize, Layout, Button, ButtonProps, Text } from '../..'

export default {
  title: 'Components / Button',

  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Button</Title>
            <Subtitle>
              <code>{`import {Button} from '@harness/uicore'`}</code>
            </Subtitle>
            <Description>
              {
                'Button component reuses Blueprints Button and implements the look and feel of [HDL](https://projects.invisionapp.com/d/?origin=v7#/projects/prototypes/17628604). Button API is exactly the same as [Blueprints Button](https://blueprintjs.com/docs/#core/components/button).'
              }
            </Description>
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
      <Layout.Horizontal spacing="small">
        <Story />
      </Layout.Horizontal>
    )
  ]
} as Meta

export const ButtonVariationsAndSizesExamples: Story<ButtonProps> = () => {
  return (
    <Layout.Vertical spacing="large">
      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Primary" variation={ButtonVariation.PRIMARY} />
          <Button text="With left button" icon="chevron-left" variation={ButtonVariation.PRIMARY} />
          <Button text="With right button" rightIcon="chevron-right" variation={ButtonVariation.PRIMARY} />
          <Button text="Loading..." loading variation={ButtonVariation.PRIMARY} />
          <Button text="Disabled" variation={ButtonVariation.PRIMARY} disabled tooltip="Permission required" />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Large" variation={ButtonVariation.PRIMARY} size={ButtonSize.LARGE} />
          <Button
            text="Large + left icon"
            icon="arrow-left"
            variation={ButtonVariation.PRIMARY}
            size={ButtonSize.LARGE}
          />
          <Button
            text="Large + right icon"
            rightIcon="arrow-right"
            variation={ButtonVariation.PRIMARY}
            size={ButtonSize.LARGE}
          />
          <Button text="Small" variation={ButtonVariation.PRIMARY} size={ButtonSize.SMALL} />
          <Button
            text="Small + left icon"
            icon="arrow-left"
            variation={ButtonVariation.PRIMARY}
            size={ButtonSize.SMALL}
          />
          <Button
            text="Small + right icon"
            rightIcon="arrow-right"
            variation={ButtonVariation.PRIMARY}
            size={ButtonSize.SMALL}
          />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Secondary" variation={ButtonVariation.SECONDARY} />
          <Button text="With left button" icon="chevron-left" variation={ButtonVariation.SECONDARY} />
          <Button text="With right button" rightIcon="chevron-right" variation={ButtonVariation.SECONDARY} />
          <Button text="Loading..." loading variation={ButtonVariation.SECONDARY} />
          <Button text="Disabled" variation={ButtonVariation.SECONDARY} disabled tooltip="Permission required" />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Large" variation={ButtonVariation.SECONDARY} size={ButtonSize.LARGE} />
          <Button
            text="Large + left icon"
            icon="arrow-left"
            variation={ButtonVariation.SECONDARY}
            size={ButtonSize.LARGE}
          />
          <Button
            text="Large + right icon"
            rightIcon="arrow-right"
            variation={ButtonVariation.SECONDARY}
            size={ButtonSize.LARGE}
          />
          <Button text="Small" variation={ButtonVariation.SECONDARY} size={ButtonSize.SMALL} />
          <Button
            text="Small + left icon"
            icon="arrow-left"
            variation={ButtonVariation.SECONDARY}
            size={ButtonSize.SMALL}
          />
          <Button
            text="Small + right icon"
            rightIcon="arrow-right"
            variation={ButtonVariation.SECONDARY}
            size={ButtonSize.SMALL}
          />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Tertiary" variation={ButtonVariation.TERTIARY} />
          <Button text="With left button" icon="chevron-left" variation={ButtonVariation.TERTIARY} />
          <Button text="With right button" rightIcon="chevron-right" variation={ButtonVariation.TERTIARY} />
          <Button text="Loading..." loading variation={ButtonVariation.TERTIARY} />
          <Button text="Disabled" variation={ButtonVariation.TERTIARY} disabled tooltip="Permission required" />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Link 1" variation={ButtonVariation.LINK} />
          <Button text="Link 2" icon="chevron-left" variation={ButtonVariation.LINK} />
          <Button text="Link 3" rightIcon="chevron-right" variation={ButtonVariation.LINK} />
          <Button text="Link 4" loading variation={ButtonVariation.LINK} />
          <Button text="Link 5" variation={ButtonVariation.LINK} disabled tooltip="Permission required" />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="medium">
          <Button text="Large" variation={ButtonVariation.TERTIARY} size={ButtonSize.LARGE} />
          <Button
            text="Large + left icon"
            icon="arrow-left"
            variation={ButtonVariation.TERTIARY}
            size={ButtonSize.LARGE}
          />
          <Button
            text="Large + right icon"
            rightIcon="arrow-right"
            variation={ButtonVariation.TERTIARY}
            size={ButtonSize.LARGE}
          />
          <Button text="Small" variation={ButtonVariation.TERTIARY} size={ButtonSize.SMALL} />
          <Button
            text="Small + left icon"
            icon="arrow-left"
            variation={ButtonVariation.TERTIARY}
            size={ButtonSize.SMALL}
          />
          <Button
            text="Small + right icon"
            rightIcon="arrow-right"
            variation={ButtonVariation.TERTIARY}
            size={ButtonSize.SMALL}
          />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="xsmall">
          <Button icon="plus" variation={ButtonVariation.ICON} />
          <Button icon="Options" variation={ButtonVariation.ICON} />
          <Button icon="dashboard" variation={ButtonVariation.ICON} />
          <Button icon="cross" variation={ButtonVariation.ICON} disabled tooltip="Permission required" />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="xxlarge">
          <Button icon="upload-box" variation={ButtonVariation.PRIMARY} text="Save" />
          <Button icon="run-pipeline" variation={ButtonVariation.PRIMARY} text="Run" intent="success" />
          <Button icon="info" variation={ButtonVariation.PRIMARY} text="Warning" intent="warning" />
          <Button icon="cross" variation={ButtonVariation.PRIMARY} text="Delete" intent="danger" />
          <Button icon="chevron-left" variation={ButtonVariation.SECONDARY} text="Back" />
          <Button icon="chevron-right" variation={ButtonVariation.PRIMARY} text="Continue" />
          <Button icon="plus" rightIcon="chevron-down" variation={ButtonVariation.PRIMARY} text="New Secret" />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="xxlarge">
          <Button icon="upload-box" variation={ButtonVariation.PRIMARY} text="Save" size={ButtonSize.SMALL} />
          <Button
            icon="run-pipeline"
            variation={ButtonVariation.PRIMARY}
            text="Run"
            intent="success"
            size={ButtonSize.SMALL}
          />
          <Button
            icon="info"
            variation={ButtonVariation.PRIMARY}
            text="Warning"
            intent="warning"
            size={ButtonSize.SMALL}
          />
          <Button
            icon="cross"
            variation={ButtonVariation.PRIMARY}
            text="Delete"
            intent="danger"
            size={ButtonSize.SMALL}
          />
          <Button icon="chevron-left" variation={ButtonVariation.SECONDARY} text="Back" size={ButtonSize.SMALL} />
          <Button icon="chevron-right" variation={ButtonVariation.PRIMARY} text="Continue" size={ButtonSize.SMALL} />
          <Button
            icon="plus"
            rightIcon="chevron-down"
            variation={ButtonVariation.PRIMARY}
            text="New Secret"
            size={ButtonSize.SMALL}
          />
        </Layout.Horizontal>
      </Container>
    </Layout.Vertical>
  )
}

export const PrimaryButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button text="Text Button" {...args} />
      <Button icon="plus" {...args} />
      <Button text="Right Icon" rightIcon="chevron-right" {...args} />
      <Button text="Left Icon" icon="chevron-left" {...args} />
      <Button text="Down Icon" rightIcon="chevron-down" {...args} />
      <Button round text="Round Button" {...args} />
      <Button text="Disabled" disabled icon="cog" {...args} />
      <Button loading text="Text Button" {...args} />
    </>
  )
}
PrimaryButton.argTypes = { onClick: { action: 'clicked' } }
PrimaryButton.args = { intent: 'primary' }

export const PrimaryButtonBorderLess: Story<ButtonProps> = args => {
  return (
    <>
      <Button intent="primary" text="Text Button" onClick={() => alert('Hello World')} {...args} />
      <Button intent="primary" icon="plus" onClick={() => alert('Hello World')} {...args} />
      <Button
        intent="primary"
        text="Right Icon"
        rightIcon="chevron-right"
        onClick={() => alert('Hello World')}
        {...args}
      />
      <Button intent="primary" text="Left Icon" icon="chevron-left" onClick={() => alert('Hello World')} {...args} />
      <Button
        intent="primary"
        text="Down Icon"
        rightIcon="chevron-down"
        onClick={() => alert('Hello World')}
        {...args}
      />
      <Button intent="primary" round text="Round Button" onClick={() => alert('Hello World')} {...args} />
      <Button intent="primary" text="Disabled" disabled icon="cog" onClick={() => alert('Hello World')} {...args} />
      <Button loading intent="primary" text="Text Button" onClick={() => alert('Hello World')} {...args} />
    </>
  )
}
PrimaryButtonBorderLess.storyName = 'Primary Button (BorderLess)'
PrimaryButtonBorderLess.args = { minimal: true, intent: 'primary' }

export const SecondaryButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button text="Text Button" {...args} />
      <Button icon="plus" {...args} />
      <Button text="Right Icon" rightIcon="chevron-right" {...args} />
      <Button text="Left Icon" icon="chevron-left" {...args} />
      <Button text="Down Icon" rightIcon="chevron-down" {...args} />
      <Button round text="Round Button" {...args} />
      <Button text="Disabled" disabled icon="cog" {...args} />
      <Button loading text="Text Button" {...args} />
    </>
  )
}
SecondaryButton.argTypes = { onClick: { action: 'clicked' } }
SecondaryButton.args = { intent: 'none' }
export const SuccessButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button text="Text Button" {...args} />
      <Button icon="plus" {...args} />
      <Button text="Right Icon" rightIcon="chevron-right" {...args} />
      <Button text="Left Icon" icon="chevron-left" {...args} />
      <Button text="Down Icon" rightIcon="chevron-down" {...args} />
      <Button round text="Round Button" {...args} />
      <Button text="Disabled" disabled icon="cog" {...args} />
      <Button loading text="Text Button" {...args} />
    </>
  )
}
SuccessButton.argTypes = { onClick: { action: 'clicked' } }
SuccessButton.args = { intent: 'success' }
export const DangerButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button text="Text Button" {...args} />
      <Button icon="plus" {...args} />
      <Button text="Right Icon" rightIcon="chevron-right" {...args} />
      <Button text="Left Icon" icon="chevron-left" {...args} />
      <Button text="Down Icon" rightIcon="chevron-down" {...args} />
      <Button round text="Round Button" {...args} />
      <Button text="Disabled" disabled icon="cog" {...args} />
      <Button loading text="Text Button" {...args} />
    </>
  )
}
DangerButton.argTypes = { onClick: { action: 'clicked' } }
DangerButton.args = { intent: 'danger' }
export const WarningButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button text="Text Button" {...args} />
      <Button icon="plus" {...args} />
      <Button text="Right Icon" rightIcon="chevron-right" {...args} />
      <Button text="Left Icon" icon="chevron-left" {...args} />
      <Button text="Down Icon" rightIcon="chevron-down" {...args} />
      <Button round text="Round Button" {...args} />
      <Button text="Disabled" disabled icon="cog" {...args} />
      <Button loading text="Text Button" {...args} />
    </>
  )
}
WarningButton.argTypes = { onClick: { action: 'clicked' } }
WarningButton.args = { intent: 'warning' }

export const IconOnlyButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button icon="plus" {...args} />
      <Button icon="plus" disabled {...args} />
      <Button icon="plus" minimal withoutCurrentColor {...args} />
      <Button icon="plus" minimal disabled {...args} />
      <Button intent="primary" icon="build" {...args} />
      <Button intent="primary" icon="build" disabled {...args} />
      <Button intent="primary" icon="build" minimal {...args} />
      <Button intent="primary" icon="build" minimal disabled {...args} />
      <Button intent="primary" round icon="build" {...args} />
      <Button intent="success" icon="chevron-left" {...args} />
      <Button intent="success" icon="chevron-left" disabled {...args} />
      <Button intent="warning" icon="chevron-right" {...args} />
      <Button intent="warning" icon="chevron-right" disabled {...args} />
      <Button intent="danger" icon="delete" {...args} />
      <Button intent="danger" icon="delete" disabled {...args} />
    </>
  )
}

export const IconOnlyBorderlessButton: Story<ButtonProps> = args => {
  return (
    <>
      <Layout.Horizontal inline>
        <Button icon="main-pause" minimal {...args} />
        <Button icon="main-start" minimal {...args} />
        <Button icon="main-abort" minimal {...args} />
        <Button icon="main-more" minimal {...args} />
      </Layout.Horizontal>
      <Layout.Horizontal inline>
        <Button icon="main-pause" minimal iconProps={{ size: 10 }} {...args} />
        <Button icon="main-start" minimal iconProps={{ size: 10 }} {...args} />
        <Button icon="main-abort" minimal iconProps={{ size: 10 }} {...args} />
        <Button icon="main-more" minimal iconProps={{ size: 10 }} {...args} />
      </Layout.Horizontal>
    </>
  )
}
export const LargeButton: Story<ButtonProps> = args => {
  return (
    <>
      <Button intent="primary" text="Go to Application/Workflow Setup" {...args} />
      <Button intent="primary" minimal text="A Large Button" {...args} />
      <Button icon="main-more" intent="success" minimal {...args} />
      <Button text="Text Button" {...args} />
      <Button text="Round Button" round {...args} />
      <Button intent="primary" icon="build" {...args} />
      <Button icon="plus" {...args} />
    </>
  )
}
LargeButton.args = {
  large: true
}
export const LoadingTransition: Story<ButtonProps> = args => {
  return (
    <>
      <Layout.Vertical flex spacing="medium">
        <Text>
          Buttons onClick accepts an async function. When the button is clicked, loading state is triggered
          automatically. When the onClick function is resolved, loading state is removed.
        </Text>
        <Text>
          Note that onClick is not executed multiple times if user clicks it constantly. When an onClick event happens,
          the onClick function must be resolved (or rejected) before another click event is allowed.
        </Text>
        <Layout.Horizontal spacing="medium">
          <Button
            intent="primary"
            text="Submit (resolved after 3s)"
            {...args}
            onClick={async () => new Promise(resolve => setTimeout(resolve, 3000))}
          />
          <Button
            intent="primary"
            text="Submit (rejected after 3s)"
            {...args}
            onClick={async () => new Promise((_, reject) => setTimeout(reject, 3000))}
          />
        </Layout.Horizontal>
      </Layout.Vertical>
    </>
  )
}

LoadingTransition.decorators = []
// LoadingTransition.parameters = {
//   docs: {
//     source: {
//       type: 'code'
//     }
//   }
// }
