/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import { CardSelect, Text, CardBody } from '../static/index'
import './CardSelectExample.css'

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

export const CardSelectExample = () => {
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
    cornerSelected: true,
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
}
