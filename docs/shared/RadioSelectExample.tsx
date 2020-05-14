import React, { useState } from 'react'
import { RadioSelect, Text, CardBody } from '../static/index'
import './RadioSelectExample.css'

interface Data {
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

export const RadioSelectExample = () => {
  const [selected, setSelected] = useState(data[2])
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
  return <RadioSelect {...props} selected={selected} />
}
