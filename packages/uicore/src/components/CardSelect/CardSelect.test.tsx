/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { CardSelect } from './CardSelect'
import { CardBody } from '../Card/Card'
import { Text } from '../Text/Text'
import { IconName } from '@harness/icons'

interface Data {
  text: string
  value: string
  icon: IconName
  disabled?: boolean
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

const getDefaultProps = (item?: Data) => ({
  data,
  className: 'grid',
  // eslint-disable-next-line react/display-name
  renderItem: (item: Data, selected: boolean) => (
    <CardBody.Icon icon={item.icon} iconSize={25}>
      <Text color={selected ? 'var(--grey-900)' : 'var(--grey-350)'}>{item.text}</Text>
    </CardBody.Icon>
  ),
  onChange: jest.fn(),
  selected: item
})

describe('Test render Radio Select', () => {
  test('should render default values', () => {
    const { container } = render(<CardSelect {...getDefaultProps()} />)
    expect(container).toMatchSnapshot()
  })
  test('should render with selected values', () => {
    const { container } = render(<CardSelect {...getDefaultProps(data[2])} />)
    expect(container).toMatchSnapshot()
  })
  test('should render with disabled value', () => {
    const props = getDefaultProps()
    props.data[2] = { ...props.data[2], disabled: true }
    const { container } = render(<CardSelect {...props} />)
    expect(container).toMatchSnapshot()
  })
  test('should handle on change Event', async () => {
    const props = getDefaultProps(data[2])
    const selectedIndex = 5
    const { container } = render(<CardSelect {...props} />)
    fireEvent.click(container.querySelectorAll('.bp3-card')[selectedIndex])
    await wait()
    expect(props.onChange).toHaveBeenCalledWith(data[selectedIndex], expect.any(Object))
  })
  test('should handle on arrow key Event', async () => {
    const defaultIndex = 2
    const props = getDefaultProps(data[defaultIndex])
    const { container } = render(<CardSelect {...props} />)

    // Left Arrow
    fireEvent.keyDown(container.querySelectorAll('.bp3-card')[defaultIndex], {
      key: 'ArrowLeft',
      keyCode: 37,
      which: 37
    })
    await wait()
    expect(props.onChange).toHaveBeenCalledWith(data[defaultIndex - 1], expect.any(Object))

    // Right Arrow
    fireEvent.keyDown(container.querySelectorAll('.bp3-card')[defaultIndex], {
      key: 'ArrowRight',
      keyCode: 39,
      which: 39
    })
    await wait()
    expect(props.onChange).toHaveBeenCalledWith(data[defaultIndex + 1], expect.any(Object))
  })

  test('should handle on Enter key Event', async () => {
    const defaultIndex = 2
    const selectedIndex = 5
    const props = getDefaultProps(data[defaultIndex])
    const { container } = render(<CardSelect {...props} />)

    // Enter Key
    fireEvent.keyDown(container.querySelectorAll('.bp3-card')[selectedIndex], {
      key: 'Enter',
      keyCode: 13,
      which: 14
    })
    await wait()
    expect(props.onChange).toHaveBeenCalledWith(data[selectedIndex], expect.any(Object))
  })
})
