/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, Description, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Layout, Button, ButtonProps, Text } from '../..'

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
              <code>{`import {Button} from '@wings-software/uicore'`}</code>
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

export const ButtonExamples: Story<ButtonProps> = args => {
  return (
    <>
      <Button text="Primary"/>
      <Button text="Secondary"/>
      <Button text="Secondary (outline)"/>
      <Button icon="plus" tooltip="Icon"/>
      <Button loading text="Text Button" {...args} />
    </>
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
