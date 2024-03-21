/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-alert */
import { PopoverPosition } from '@blueprintjs/core'
import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { noop } from 'lodash-es'
import React from 'react'
import { ButtonVariation, Container, Layout, SplitButton, SplitButtonOption } from '../..'

export default {
  title: 'Components / SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>SplitButton</Title>

            <code>{`import {SplitButton} from '@harnessio/uicore'`}</code>
            <Description>
              {`SplitButton component reuses Blueprint's Button and Dropdown and implements the look and feel of [HDL](https://www.figma.com/file/ea1BP4IVHDXqeOND0S9YVZ/branch/2J7UGgUU3p83RkO4BtX1Mo/HDS-Toolkit?node-id=880%3A33183).`}
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
} as ComponentMeta<typeof SplitButton>

export const PrimarySplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton
        text="Save"
        icon="upload-box"
        variation={ButtonVariation.PRIMARY}
        popoverProps={{
          interactionKind: 'click',
          usePortal: true,
          position: PopoverPosition.BOTTOM_RIGHT
        }}
        {...args}>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} />
      </SplitButton>
    </Container>
  )
}
PrimarySplitButton.argTypes = { onClick: { action: 'clicked' } }
PrimarySplitButton.args = { intent: 'primary' }

export const SecondarySplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.SECONDARY} {...args}>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} />
      </SplitButton>
    </Container>
  )
}
SecondarySplitButton.argTypes = { onClick: { action: 'clicked' } }
SecondarySplitButton.args = { intent: 'primary' }

export const TertiarySplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.TERTIARY} {...args}>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} />
      </SplitButton>
    </Container>
  )
}
TertiarySplitButton.argTypes = { onClick: { action: 'clicked' } }
TertiarySplitButton.args = { intent: 'primary' }

export const LinkSplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.LINK} {...args}>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} />
      </SplitButton>
    </Container>
  )
}
LinkSplitButton.argTypes = { onClick: { action: 'clicked' } }
LinkSplitButton.args = { intent: 'primary' }

export const DisabledSplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.PRIMARY} {...args} disabled>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} />
      </SplitButton>
    </Container>
  )
}
DisabledSplitButton.argTypes = { onClick: { action: 'clicked' } }
DisabledSplitButton.args = { intent: 'primary' }

export const DisabledSplitButtonOptions: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.PRIMARY} {...args} disabled>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} disabled />
      </SplitButton>
    </Container>
  )
}
DisabledSplitButtonOptions.argTypes = { onClick: { action: 'clicked' } }
DisabledSplitButtonOptions.args = { intent: 'primary' }

export const DisabledAllSplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton
        text="Save"
        icon="upload-box"
        variation={ButtonVariation.PRIMARY}
        {...args}
        disabled
        dropdownDisabled>
        <SplitButtonOption icon="search-template" text="Save as Template" onClick={noop} />
        <SplitButtonOption icon="refresh" text="Refresh" onClick={noop} />
      </SplitButton>
    </Container>
  )
}

export const NoChildrenSplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.PRIMARY} {...args}></SplitButton>
    </Container>
  )
}

export const DisabledNoChildrenSplitButton: ComponentStory<typeof SplitButton> = args => {
  return (
    <Container>
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.PRIMARY} {...args} disabled></SplitButton>
    </Container>
  )
}

DisabledAllSplitButton.argTypes = { onClick: { action: 'clicked' } }
DisabledAllSplitButton.args = { intent: 'primary' }
