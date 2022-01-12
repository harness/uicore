/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, ButtonGroup, Button, OptionsButtonGroup, OptionsButtonGroupProps, IconName, Text } from '../..'
import { omit } from 'lodash-es'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
export default {
  title: 'Components / ButtonGroup',

  component: OptionsButtonGroup,
  subcomponents: { Button, ButtonGroup },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Button Group</Title>
            <Subtitle>
              <>
                <pre>
                  <code>{`import { ButtonGroup, OptionsButtonGroup }  from '@harness/uicore'`}</code>
                </pre>
                <h3>ButtonGroup</h3>
                <Text>This component takes Button components as its children</Text>
                <pre>
                  <code>{` <ButtonGroup>
    <Button text="Applications" />
    <Button text="Clusters" />
  </ButtonGroup>`}</code>
                </pre>
                <h3>OptionsButtonGroup</h3>
                <Text>
                  This component makes it easy to control buttons in a button group. It takes an array of ButtonProps
                  where each item has two more extra optional fields value and selected, renders the ButtonGroup
                  properly, and invokes onChange with the value of the selected item in the collection when the item is
                  clicked.
                </Text>
              </>
            </Subtitle>
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
export const OptionsButtonGroupSelected: Story<OptionsButtonGroupProps> = args => {
  const options1 = args.options
    ? args.options
    : [
        {
          text: 'Applications',
          tooltip: 'Select Applications',
          value: 'applications'
        },
        {
          text: 'Clusters',
          tooltip: 'Select Clusters',
          value: 'clusters',
          selected: true
        }
      ]
  const options2 = args.options
    ? args.options
    : [
        { icon: 'box' as IconName, tooltip: 'a box', value: 'box' },
        {
          icon: 'build' as IconName,
          tooltip: 'build',
          value: 'build',

          selected: true
        },
        { icon: 'alignment-bottom' as IconName, tooltip: 'Align bottom', value: 'bottom' },
        { icon: 'edit' as IconName, value: 'edit', tooltip: 'Edit' }
      ]
  const argsCopy = omit(args, 'options')
  return (
    <>
      <OptionsButtonGroup options={options1} onChange={value => alert(`Select ${value}`)} {...argsCopy} />
      <OptionsButtonGroup options={options2} onChange={value => alert(`Select ${value}`)} {...argsCopy} />
    </>
  )
}
export const OptionsButtonGroupNoDefaultSelected: Story<OptionsButtonGroupProps> = args => {
  const options1 = args.options
    ? args.options
    : [
        {
          text: 'Applications',
          tooltip: 'Select Applications',
          value: 'applications'
        },
        {
          text: 'Clusters',
          tooltip: 'Select Clusters',
          value: 'clusters'
        }
      ]
  const options2 = args.options
    ? args.options
    : [
        { icon: 'box' as IconName, tooltip: 'a box', value: 'box' },
        {
          icon: 'build' as IconName,
          tooltip: 'build',
          value: 'build'
        },
        { icon: 'alignment-bottom' as IconName, tooltip: 'Align bottom', value: 'bottom' },
        { icon: 'edit' as IconName, value: 'edit', tooltip: 'Edit' }
      ]
  const argsCopy = omit(args, 'options')
  return (
    <>
      <Layout.Vertical>
        <Text> Below Controls works when a button is selected</Text>
        <Layout.Horizontal padding={{ top: 'medium' }}>
          <OptionsButtonGroup options={options1} onChange={value => alert(`Select ${value}`)} {...argsCopy} />
          <OptionsButtonGroup options={options2} onChange={value => alert(`Select ${value}`)} {...argsCopy} />
        </Layout.Horizontal>
      </Layout.Vertical>
    </>
  )
}
export const ButtonGroupWithButtons = () => {
  return (
    <>
      <Layout.Vertical>
        <Text> ButtonGroup will take Button Components as children</Text>
        <Layout.Horizontal padding={{ top: 'medium' }}>
          <ButtonGroup>
            <Button text="Applications" />
            <Button text="Clusters" />
          </ButtonGroup>
          <ButtonGroup>
            <Button icon="box" tooltip="This is a box" />
            <Button icon="build" />
            <Button icon="alignment-bottom" tooltip="Align bottom" />
            <Button icon="duplicate" />
            <Button icon="edit" tooltip="Click here to edit" />
          </ButtonGroup>
        </Layout.Horizontal>
      </Layout.Vertical>
    </>
  )
}
ButtonGroupWithButtons.argTypes = {
  intent: { table: { disable: true } },
  onChange: { table: { disable: true } },
  options: { table: { disable: true } },
  children: 'Buttons'
}
