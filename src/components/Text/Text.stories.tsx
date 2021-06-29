import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Text, TextProps, Layout, Container, Color, SupText } from '../..'

export default {
  title: 'Components / Text',

  component: Text,
  subcomponents: { SupText },
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Text</Title>
            <Subtitle>
              <pre>
                <code>{`import {Text} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{`When lineClamp prop is provided, Text will handle string truncation automatically. Note that the truncation only happens when there is not enough space to render the text content.

`}</Description>
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
      <Layout.Vertical>
        <Story />
      </Layout.Vertical>
    )
  ]
} as Meta
export const Basic: Story<TextProps> = args => {
  return (
    <>
      <Text {...args}>The quick brown fox jumps over the lazy dog</Text>
      <Text font="xsmall" {...args} tooltip={'Sample'} tooltipProps={{ isDark: true }}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="small" {...args}>
        he quick brown fox jumps over the lazy dog
      </Text>
      <Text font="normal" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="medium" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="large" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const FontWeight: Story<TextProps> = args => {
  return (
    <>
      <Text font={{ weight: 'bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font={{ weight: 'semi-bold' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font={{ weight: 'light' }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const Mono: Story<TextProps> = args => {
  return (
    <>
      <Text font={{ mono: true }} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const Intent: Story<TextProps> = args => {
  return (
    <>
      <Text intent="primary" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text intent="success" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text intent="warning" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text intent="danger" {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const EllipsisTextTruncation: Story<TextProps> = args => {
  return (
    <Layout.Horizontal spacing="medium">
      <Text font="normal" color="red500" lineClamp={1} {...args}>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
        jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
        dog. The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="normal" color="green500" lineClamp={1} {...args}>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
        jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
        dog. The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="normal" color="blue500" lineClamp={1} {...args}>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
        jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
        dog. The quick brown fox jumps over the lazy dog
      </Text>
    </Layout.Horizontal>
  )
}
export const SingleLineWithFixedWidthSetFromParent: Story<TextProps> = args => {
  return (
    <Container width={300} flex>
      <Text font="normal" color="red500" lineClamp={1} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="normal" color="green500" lineClamp={1} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text font="normal" color="blue500" lineClamp={1} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </Container>
  )
}
export const SingleLineWithWidthSetFromTextItself: Story<TextProps> = args => {
  return (
    <>
      <Text font="normal" lineClamp={1} width={100} {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const CustomTooltip: Story<TextProps> = args => {
  return (
    <>
      <Text
        font="normal"
        lineClamp={1}
        width={100}
        tooltip={<Container padding="small">Custom tooltip</Container>}
        {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const AlwaysShowTooltip: Story<TextProps> = args => {
  return (
    <>
      <Text>Note:Always show tooltip (even in case lineClamp is not needed) - tooltip needs to be passed.</Text>
      <Text
        font="normal"
        lineClamp={1}
        width={400}
        tooltip={<Container padding="small">Custom tooltip</Container>}
        alwaysShowTooltip
        {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </>
  )
}
export const MultipleLines: Story<TextProps> = args => {
  return (
    <Text font="normal" lineClamp={2} {...args}>
      The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
      jumps over the lazy dog.The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
      The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog. The quick brown fox jumps
      over the lazy dog. The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog. The
      quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.The quick brown fox jumps
      over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.The
      quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps
      over the lazy dog.
    </Text>
  )
}
export const MultipleLineWithFluidWidthFromParent: Story<TextProps> = args => {
  return (
    <>
      <Layout.Horizontal spacing="medium">
        <Text font="normal" color="red500" lineClamp={2} {...args}>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
          jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
          dog. The quick brown fox jumps over the lazy dog
        </Text>
        <Text font="normal" color="green500" lineClamp={2} {...args}>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
          jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
          dog. The quick brown fox jumps over the lazy dog
        </Text>
        <Text font="normal" color="blue500" lineClamp={2} {...args}>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
          jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
          dog. The quick brown fox jumps over the lazy dog
        </Text>
      </Layout.Horizontal>
    </>
  )
}
export const CustomTooltip2: Story<TextProps> = args => {
  return (
    <Text font="normal" lineClamp={2} tooltip={<Container padding="small">Custom tooltip</Container>} {...args}>
      The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
      jumps over the lazy dog.The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
      The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog. The quick brown fox jumps
      over the lazy dog. The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog. The
      quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.The quick brown fox jumps
      over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.The
      quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps
      over the lazy dog.
    </Text>
  )
}
export const NoTooltipWhenThereIsEnoughSpaceToRenderTheWholeText: Story<TextProps> = args => {
  return (
    <Text font="normal" width={300} lineClamp={3} {...args}>
      The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox
      jumps over the lazy dog.
    </Text>
  )
}
export const LeftIcon: Story<TextProps> = args => {
  return (
    <>
      <Text inline icon="service-datadog" iconProps={{ size: 20 }} {...args}>
        Datadog
      </Text>
      <Text inline icon="full-circle" iconProps={{ size: 10, color: Color.BLUE_500 }} {...args}>
        qa-cluster
      </Text>
      <Text inline icon="cross" iconProps={{ size: 16, color: Color.RED_500 }} {...args}>
        Disconnected
      </Text>
    </>
  )
}
export const RightIcon: Story<TextProps> = args => {
  return (
    <>
      <Text inline rightIcon="stop" rightIconProps={{ size: 16, color: Color.BLUE_500 }} {...args}>
        2 Instances
      </Text>
      <Text inline rightIcon="tick" rightIconProps={{ size: 16, color: Color.GREEN_500 }} {...args}>
        Password must have at least 1 uppercase.
      </Text>
    </>
  )
}
export const RightAlignment: Story<TextProps> = args => {
  return (
    <>
      <Text icon="service-datadog" iconProps={{ size: 20 }} style={{ justifyContent: 'flex-end' }} {...args}>
        Datadog
      </Text>
    </>
  )
}
export const CombiningWithOtherStyledProps: Story<TextProps> = args => {
  return (
    <Layout.Vertical id="text-styled-props">
      <Text
        padding="small"
        font={{ size: 'large', align: 'center' }}
        border={{ color: 'green500' }}
        background="grey100"
        {...args}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </Layout.Vertical>
  )
}
export const SupTextBasic: Story<TextProps> = args => {
  return (
    <Text {...args}>
      Continuous Efficiency
      <SupText background="yellow600" color="white">
        beta
      </SupText>
    </Text>
  )
}
