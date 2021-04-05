/* eslint-disable react/display-name */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CardSelect, Text, Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { CardSelectProps } from '../CardSelect/CardSelect'
import { CardSelectExample, CardMultiSelectExample } from './CardSelectExample'

export default {
  title: 'Components / CardSelect',

  component: CardSelect,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CardSelect</Title>

            <Description>{`Design is a like card select component [CD Next Gen](https://harness.atlassian.net/wiki/spaces/UI/pages/668205796/Radio+Button+Select)

Should support

- Dynamic Cards of any design
- Keyboard Events - left arrow, right arrow and Enter

Internally it uses [Card](/card) component and define renderItem method to define the cody of the card and you use class to customize the card
`}</Description>
            <Subtitle>
              <>
                <pre>
                  <code>{`import { CardSelect }  from '@wings-software/uicore'`}</code>
                </pre>
                <pre>
                  <code>{`interface Data {
  text: string
  value: string
  icon: string
}

const data: Data[] = [
  {
    text: 'Kubernetes',
    value: 'service-kubernetes',
    icon: 'service-kubernetes'
  },
  {
    text: 'Github',
    value: 'service-github',
    icon: 'service-github'
  },
  {
    text: 'GCP',
    value: 'service-gcp',
    icon: 'service-gcp'
  },
  {
    text: 'ELK Service',
    value: 'service-elk',
    icon: 'service-elk'
  },
  {
    text: 'Git Labs',
    value: 'service-gotlab',
    icon: 'service-gotlab'
  },
  {
    text: 'Datadog',
    value: 'service-datadog',
    icon: 'service-datadog'
  },
  {
    text: 'Slack',
    value: 'service-slack',
    icon: 'service-slack'
  },
  {
    text: 'Jenkins',
    value: 'service-jenkins',
    icon: 'service-jenkins'
  }
]


export const CardSelectExample = () => {
  const [selected, setSelected] = useState(null)
  const props = {
    data,
    className: 'grid',
    renderItem: (item, selected) => (
      <CardBody.Icon icon={item.icon} iconSize={25}>
        <Text font={{ size: 'small', align: 'center', color: selected ? 'var(--grey-900)' : 'var(--grey-350)' }}>
          {item.text}
        </Text>
      </CardBody.Icon>
    ),
    onChange: value => setSelected(value)
  }
  return <CardSelect {...props} selected={selected} />
}

export const CardMultiSelectExample = () => {
  const [selected, setSelected] = useState([data[2], data[4]])

  const onChange = React.useCallback(
    value => {
      const selectedAr = [...selected]
      const index = selectedAr.indexOf(value)
      if (index > -1) {
        selectedAr.splice(index, 1)
      } else {
        selectedAr.push(value)
      }
      setSelected(selectedAr)
    },
    [selected]
  )
  const props = {
    data,
    multi: true,
    className: 'grid',
    renderItem: (item, selected) => (
      <CardBody.Icon icon={item.icon} iconSize={25}>
        <Text font={{ size: 'small', align: 'center', color: selected ? 'var(--grey-900)' : 'var(--grey-350)' }}>
          {item.text}
        </Text>
      </CardBody.Icon>
    ),
    onChange
  }
  return <CardSelect {...props} selected={selected} />
}`}</code>
                </pre>
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
  decorators: [Story => <Story />]
} as Meta

export const Select: Story<CardSelectProps<any>> = _args => {
  return (
    <Layout.Vertical spacing="large">
      <Text>Control are not connected to example</Text>
      <CardSelectExample />
    </Layout.Vertical>
  )
}
export const MultiSelect: Story<CardSelectProps<any>> = _args => {
  return (
    <Layout.Vertical spacing="large">
      <Text>Control are not connected to example</Text>
      <CardMultiSelectExample />
    </Layout.Vertical>
  )
}
