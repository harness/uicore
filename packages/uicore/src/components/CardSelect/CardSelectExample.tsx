/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { CardSelect, Text, CardBody } from '../..'

interface Data {
  text: string
  value: string
  icon: string
}

const data: Data[] = [
  {
    text: 'Kubernetes',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'Github',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'GCP',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'ELK Service',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'Git Labs',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'Datadog',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'Slack',
    value: 'advanced',
    icon: 'advanced'
  },
  {
    text: 'Jenkins',
    value: 'advanced',
    icon: 'advanced'
  }
]

export const CardSelectExample = () => {
  const [selected, setSelected] = useState(data[2])
  const props = {
    data,
    className: 'grid',
    renderItem: (item: any, selected: any) => (
      <CardBody.Icon icon={item.icon} iconSize={25}>
        <Text font={{ size: 'small', align: 'center' }} color={selected ? 'var(--grey-900)' : 'var(--grey-350)'}>
          {item.text}
        </Text>
      </CardBody.Icon>
    ),
    cornerSelected: true,
    onChange: (value: any) => setSelected(value)
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
    renderItem: (item: any, selected: any) => (
      <CardBody.Icon icon={item.icon} iconSize={25}>
        <Text font={{ size: 'small', align: 'center' }} color={selected ? 'var(--grey-900)' : 'var(--grey-350)'}>
          {item.text}
        </Text>
      </CardBody.Icon>
    ),
    onChange
  }
  return <CardSelect {...props} selected={selected} />
}
