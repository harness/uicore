/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, Description, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Container, ButtonVariation, ButtonSize, Layout, Button, ButtonProps, Text } from '../..'
import { noop } from 'lodash-es'

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
          <Button text="Secondary Danger" variation={ButtonVariation.SECONDARY} intent="danger" />
          <Button text="Secondary Warning" icon="chevron-left" variation={ButtonVariation.SECONDARY} intent="warning" />
          <Button
            text="Secondary Warning Disabled"
            icon="chevron-left"
            variation={ButtonVariation.SECONDARY}
            intent="warning"
            disabled
          />
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

      <Container>
        <Layout.Horizontal spacing="xxlarge" flex={{ justifyContent: 'flex-start' }}>
          <Button variation={ButtonVariation.AI} text="Harness AI Copilot" size={ButtonSize.LARGE} />
          <Button variation={ButtonVariation.AI} text="Harness AI Copilot" size={ButtonSize.MEDIUM} />
          <Button variation={ButtonVariation.AI} text="Harness AI Copilot" size={ButtonSize.SMALL} />
        </Layout.Horizontal>
      </Container>

      <Container>
        <Layout.Horizontal spacing="xxlarge" flex={{ justifyContent: 'flex-start' }}>
          <Button variation={ButtonVariation.AI_PRIMARY} text="Harness AI" size={ButtonSize.LARGE} />
          <Button variation={ButtonVariation.AI_PRIMARY} text="Harness AI" size={ButtonSize.MEDIUM} />
          <Button variation={ButtonVariation.AI_PRIMARY} text="Harness AI" size={ButtonSize.SMALL} />
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
export const ParentLoadingTransition: Story<ButtonProps> = args => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Layout.Vertical flex spacing="medium">
        <Text>Buttons accept loading prop. When loading is true, loading state is triggered automatically.</Text>
        <Layout.Horizontal spacing="medium">
          <Button
            intent="primary"
            text="Start Loading"
            {...args}
            onClick={() => {
              setLoading(true)
            }}
          />
          <Button intent="primary" text="Submit" loading={loading} {...args} onClick={noop} />
          <Button
            intent="primary"
            text="Stop Loading"
            {...args}
            onClick={() => {
              setLoading(false)
            }}
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

/**
 * Focus state verification story.
 *
 * The Button focus ring is rendered via the native `outline` property (with
 * `outline-offset`) so it never participates in layout. This story renders every
 * combination that exercises the focus CSS so the styling can be eyeballed
 * end-to-end in Storybook (or a snapshot tool):
 *  - Every `ButtonVariation` (focus-ring color comes from variation tokens).
 *  - Primary × intent and Secondary × intent (intent shouldn't change the ring color).
 *  - All sizes (offsets differ for primary/tertiary vs the rest).
 *  - Disabled buttons (must NOT show a focus ring — gated by `:not([disabled])`).
 *  - Absolutely-positioned buttons (focus must not shift them or affect layout).
 *  - AI variations (already use permanent `position: relative` for their gradient mask).
 *
 * Tab through the page; each button should receive a focus ring around it
 * without shifting position or affecting layout.
 */
export const FocusStateVerification: Story<ButtonProps> = () => {
  const sectionLabelStyle: React.CSSProperties = { fontWeight: 600, marginBottom: 8, display: 'block' }
  const sectionStyle: React.CSSProperties = { marginBottom: 24 }

  return (
    <Layout.Vertical spacing="large" style={{ padding: 24, width: '100%' }}>
      <Container style={sectionStyle}>
        <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Focus State Verification</Text>
        <Text>
          Tab through the buttons below. Every focused button should render a focus ring (1px outline at 3px offset, 2px
          for primary/tertiary) without shifting its position or altering layout. Disabled buttons must NOT render a
          focus ring.
        </Text>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>1. Every variation</span>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.PRIMARY} text="Primary" />
          <Button variation={ButtonVariation.SECONDARY} text="Secondary" />
          <Button variation={ButtonVariation.TERTIARY} text="Tertiary" />
          <Button variation={ButtonVariation.LINK} text="Link" />
          <Button variation={ButtonVariation.ICON} icon="cog" />
        </Layout.Horizontal>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>2. Primary × intent</span>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.PRIMARY} text="Default" />
          <Button variation={ButtonVariation.PRIMARY} intent="success" text="Success" />
          <Button variation={ButtonVariation.PRIMARY} intent="warning" text="Warning" />
          <Button variation={ButtonVariation.PRIMARY} intent="danger" text="Danger" />
        </Layout.Horizontal>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>3. Secondary × intent</span>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.SECONDARY} text="Default" />
          <Button variation={ButtonVariation.SECONDARY} intent="success" text="Success" />
          <Button variation={ButtonVariation.SECONDARY} intent="warning" text="Warning" />
          <Button variation={ButtonVariation.SECONDARY} intent="danger" text="Danger" />
        </Layout.Horizontal>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>4. Sizes (primary)</span>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.PRIMARY} text="Small" size={ButtonSize.SMALL} />
          <Button variation={ButtonVariation.PRIMARY} text="Medium" />
          <Button variation={ButtonVariation.PRIMARY} text="Large" size={ButtonSize.LARGE} />
        </Layout.Horizontal>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>5. With icons</span>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.PRIMARY} icon="chevron-left" text="Left icon" />
          <Button variation={ButtonVariation.PRIMARY} rightIcon="chevron-right" text="Right icon" />
          <Button variation={ButtonVariation.SECONDARY} icon="plus" text="Both" rightIcon="chevron-down" />
          <Button variation={ButtonVariation.PRIMARY} round text="Round" />
        </Layout.Horizontal>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>6. Disabled (should NOT show focus ring)</span>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.PRIMARY} text="Disabled primary" disabled />
          <Button variation={ButtonVariation.SECONDARY} text="Disabled secondary" disabled />
          <Button variation={ButtonVariation.TERTIARY} text="Disabled tertiary" disabled />
          <Button variation={ButtonVariation.LINK} text="Disabled link" disabled />
          <Button variation={ButtonVariation.ICON} icon="cog" disabled />
        </Layout.Horizontal>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>7a. Absolutely-positioned via inline style (low-risk path)</span>
        <Text style={{ marginBottom: 12 }}>
          Each button below is placed with <code>{`style={{ position: 'absolute' }}`}</code>. Inline styles always win
          the cascade over a stylesheet rule (specificity 1000 vs ~0,5,1), so consumers using inline styles were never
          affected by the legacy
          <code> position: relative</code> focus rule. They should stay rock-still on focus.
        </Text>
        <div
          style={{
            position: 'relative',
            border: '1px dashed #ccc',
            borderRadius: 4,
            height: 180,
            width: '100%',
            background: '#fafafa'
          }}>
          <Button
            variation={ButtonVariation.PRIMARY}
            text="Abs Primary"
            style={{ position: 'absolute', top: 12, left: 12 }}
          />
          <Button
            variation={ButtonVariation.SECONDARY}
            text="Abs Secondary"
            style={{ position: 'absolute', top: 12, right: 12 }}
          />
          <Button
            variation={ButtonVariation.TERTIARY}
            text="Abs Tertiary"
            style={{ position: 'absolute', bottom: 12, left: 12 }}
          />
          <Button
            variation={ButtonVariation.LINK}
            text="Abs Link"
            style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}
          />
          <Button variation={ButtonVariation.ICON} icon="cog" style={{ position: 'absolute', bottom: 12, right: 12 }} />
        </div>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>7b. Absolutely-positioned via className (the actual regression scenario)</span>
        <Text style={{ marginBottom: 12 }}>
          Each button below is placed with <code>position: absolute</code> applied via a<code> className</code> instead
          of inline style. This is how real consumers position buttons in their MFEs. The legacy focus CSS (
          <code>:focus {`{ position: relative }`}</code>) had higher specificity than a single consumer class — so on
          focus the button used to jump from its absolute coordinates to its flow position offset by <code>top</code>/
          <code>left</code>. The current <code>outline</code>-based focus ring cannot do that; these buttons must stay
          rock-still on focus.
        </Text>
        <style>
          {`
          .button-focus-abs-container {
            position: relative;
            border: 1px dashed #ccc;
            border-radius: 4px;
            height: 180px;
            width: 100%;
            background: #fafafa;
          }
          .button-focus-abs-tl { position: absolute; top: 12px; left: 12px; }
          .button-focus-abs-tr { position: absolute; top: 12px; right: 12px; }
          .button-focus-abs-bl { position: absolute; bottom: 12px; left: 12px; }
          .button-focus-abs-br { position: absolute; bottom: 12px; right: 12px; }
          .button-focus-abs-bc { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); }
          `}
        </style>
        <div className="button-focus-abs-container">
          <Button variation={ButtonVariation.PRIMARY} text="Class Abs Primary" className="button-focus-abs-tl" />
          <Button variation={ButtonVariation.SECONDARY} text="Class Abs Secondary" className="button-focus-abs-tr" />
          <Button variation={ButtonVariation.TERTIARY} text="Class Abs Tertiary" className="button-focus-abs-bl" />
          <Button variation={ButtonVariation.LINK} text="Class Abs Link" className="button-focus-abs-bc" />
          <Button variation={ButtonVariation.ICON} icon="cog" className="button-focus-abs-br" />
        </div>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>8. Button positioned absolutely inside an overflow:hidden container</span>
        <Text style={{ marginBottom: 12 }}>
          The focus ring uses <code>outline</code>, which (unlike a border) can be clipped by
          <code> overflow: hidden</code> on the ancestor. Confirm the ring still renders acceptably here — if any
          clipping is unacceptable in a real consumer, they should relax the overflow on the immediate ancestor.
        </Text>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px dashed #ccc',
            borderRadius: 4,
            height: 80,
            padding: 12
          }}>
          <Button variation={ButtonVariation.PRIMARY} text="Inside overflow:hidden" />
        </div>
      </Container>

      <Container style={sectionStyle}>
        <span style={sectionLabelStyle}>9. AI variations</span>
        <Text style={{ marginBottom: 12 }}>
          AI variations already render with a permanent <code>position: relative</code> for their <code>::before</code>{' '}
          gradient mask, so they are unaffected by the focus refactor. Verify focus ring still appears around them.
        </Text>
        <Layout.Horizontal spacing="medium">
          <Button variation={ButtonVariation.AI} text="Harness AI Copilot" />
          <Button variation={ButtonVariation.AI_PRIMARY} text="Harness AI Primary" />
          <Button variation={ButtonVariation.AI_SECONDARY} text="Harness AI Secondary" />
        </Layout.Horizontal>
      </Container>
    </Layout.Vertical>
  )
}
FocusStateVerification.storyName = 'Focus State Verification'
FocusStateVerification.decorators = []
FocusStateVerification.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'Visual verification surface for the Button focus styling. Tab through every section and confirm focus rings render correctly without shifting button position.'
    }
  }
}
