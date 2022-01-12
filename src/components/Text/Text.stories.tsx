import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Text, TextProps, Layout, Container, Color, SupText } from '../..'
import { FontVariation } from '../../styled-props/font/FontProps'

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
                <code>{`import {Text} from '@harness/uicore'`}</code>
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
export const Basic: Story<TextProps> = () => {
  return (
    <>
      <Text
        font={{ variation: FontVariation.DISPLAY1 }}
        tooltip={`<Text font={{ variation: FontVariation.DISPLAY1 }}>Display 1</Text>`}>
        Display 1
      </Text>
      <Text
        font={{ variation: FontVariation.DISPLAY2 }}
        tooltip={`<Text font={{ variation: FontVariation.DISPLAY2 }}>Display 2</Text>`}>
        Display 2
      </Text>
      <Text
        font={{ variation: FontVariation.H1 }}
        tooltip={`<Text font={{ variation: FontVariation.H1 }}>Headline Text - H1/Bold - Module Landing Title</Text>`}>
        Headline Text - H1/Bold - Module Landing Title
      </Text>
      <Text
        font={{ variation: FontVariation.H1_SEMI }}
        tooltip={`<Text font={{ variation: FontVariation.H1_SEMI }}>Headline Text - H1/Semi - Semi Bold</Text>`}>
        Headline Text - H1/Semi - Semi Bold
      </Text>
      <Text
        font={{ variation: FontVariation.H2 }}
        tooltip={`<Text font={{ variation: FontVariation.H2 }}>Headline Text - H2</Text>`}>
        Headline Text - H2
      </Text>
      <Text
        font={{ variation: FontVariation.H3 }}
        tooltip={`<Text font={{ variation: FontVariation.H3 }}>Headline Text - H3 - Dialogue Title</Text>`}>
        Headline Text - H3 - Dialogue Title
      </Text>
      <Text
        font={{ variation: FontVariation.H4 }}
        tooltip={`<Text font={{ variation: FontVariation.H4 }}>Headline Text - H4 - Page Header Title/Landing/Listing Page Empty State Title</Text>`}>
        Headline Text - H4 - Page Header Title/Landing/Listing Page Empty State Title
      </Text>
      <Text
        font={{ variation: FontVariation.H5 }}
        tooltip={`<Text font={{ variation: FontVariation.H5 }}>Headline Text - H5 - Form/Section Title</Text>`}>
        Headline Text - H5 - Form/Section Title
      </Text>
      <Text
        font={{ variation: FontVariation.H6 }}
        tooltip={`<Text font={{ variation: FontVariation.H6 }}>Headline Text - H6 - Section Title</Text>`}>
        Headline Text - H6 - Section Title
      </Text>
      <Text
        font={{ variation: FontVariation.LEAD }}
        tooltip={`<Text font={{ variation: FontVariation.LEAD }}>Lead</Text>`}>
        Lead
      </Text>
      <Text
        font={{ variation: FontVariation.BODY1 }}
        tooltip={`<Text font={{ variation: FontVariation.BODY1 }}>Body 1 - Landing page body text/Landing page (Empty state body text)</Text>`}>
        Body 1 - Landing page body text/Landing page (Empty state body text){' '}
      </Text>
      <Text
        font={{ variation: FontVariation.BODY2 }}
        tooltip={`<Text font={{ variation: FontVariation.BODY2 }}>Body 2 - Emphasized Text </Text>`}>
        Body 2 - Emphasized Text
      </Text>
      <Text
        font={{ variation: FontVariation.BODY }}
        tooltip={`<Text font={{ variation: FontVariation.BODY }}>Body - Normal Text</Text>`}>
        Body - Normal Text
      </Text>
      <Text
        font={{ variation: FontVariation.BLOCKQUOTE }}
        tooltip={`<Text font={{ variation: FontVariation.BLOCKQUOTE }}>Blockquote</Text>`}>
        Blockquote
      </Text>
      <Text
        font={{ variation: FontVariation.UPPERCASED }}
        tooltip={`<Text font={{ variation: FontVariation.UPPERCASED }}>UPPERCASED (CAPITALIZED on Design)</Text>`}>
        UPPERCASED (CAPITALIZED on Design)
      </Text>
      <Text
        font={{ variation: FontVariation.SMALL_BOLD }}
        tooltip={`<Text font={{ variation: FontVariation.SMALL_BOLD }}>Small Bold</Text>`}>
        Small Bold
      </Text>
      <Text
        font={{ variation: FontVariation.SMALL_SEMI }}
        tooltip={`<Text font={{ variation: FontVariation.SMALL_SEMI }}>Small Semi Bold</Text>`}>
        Small Semi Bold
      </Text>
      <Text
        font={{ variation: FontVariation.SMALL }}
        tooltip={`<Text font={{ variation: FontVariation.SMALL }}>Small - Supplementary info/Breadcrumb</Text>`}>
        Small - Supplementary info/Breadcrumb
      </Text>
      <Text
        font={{ variation: FontVariation.TABLE_HEADERS }}
        tooltip={`<Text font={{ variation: FontVariation.TABLE_HEADERS }}>TABLE HEADERS - LIST/TABLE HEADER (GRAY BG)/LIST/TABLE HEADER (WHITE BG)</Text>`}>
        TABLE HEADERS - LIST/TABLE HEADER (GRAY BG)/LIST/TABLE HEADER (WHITE BG)
      </Text>
      <Text
        font={{ variation: FontVariation.TINY }}
        tooltip={`<Text font={{ variation: FontVariation.TINY }}>Tiny</Text>`}>
        Tiny
      </Text>
      <Text
        font={{ variation: FontVariation.TINY_SEMI }}
        tooltip={`<Text font={{ variation: FontVariation.TINY_SEMI }}>Tiny Semi</Text>`}>
        Tiny Semi
      </Text>
      <Text
        font={{ variation: FontVariation.YAML }}
        tooltip={`<Text font={{ variation: FontVariation.YAML }} tag="pre">YAML - YAML Code</Text>`}
        tag="pre">
        YAML - YAML Code
      </Text>
      <Text
        font={{ variation: FontVariation.CARD_TITLE }}
        tooltip={`<Text font={{ variation: FontVariation.CARD_TITLE }}>Card Title - Project/Execution/Templates/Dashboards</Text>`}>
        Card Title - Project/Execution/Templates/Dashboards
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_TITLE }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_TITLE }}>Form Title</Text>`}>
        Form Title
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_SUB_SECTION }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_SUB_SECTION }}>Form Sub Section</Text>`}>
        Form Sub Section
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_INPUT_TEXT }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_INPUT_TEXT }}>Form Input Text</Text>`}>
        Form Input Text
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_LABEL }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_LABEL }}>Form Label</Text>`}>
        Form Label
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_HELP }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_HELP }}>Form Help Text</Text>`}>
        Form Help Text
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_MESSAGE_DANGER }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_MESSAGE_DANGER }}>Form Message Danger</Text>`}>
        Form Message Danger
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_MESSAGE_WARNING }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_MESSAGE_WARNING }}>Form Message Warning</Text>`}>
        Form Message Warning
      </Text>
      <Text
        font={{ variation: FontVariation.FORM_MESSAGE_SUCCESS }}
        tooltip={`<Text font={{ variation: FontVariation.FORM_MESSAGE_SUCCESS }}>Form Message Success</Text>`}>
        Form Message Success
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
