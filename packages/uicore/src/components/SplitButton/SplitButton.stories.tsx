/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
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

            <code>{`import {SplitButton} from '@harness/uicore'`}</code>
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
      <SplitButton text="Save" icon="upload-box" variation={ButtonVariation.PRIMARY} {...args}>
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
