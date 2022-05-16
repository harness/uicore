/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { Card, CardBody } from './Card'
import { Text } from '../../components/Text/Text'

const content = (
  <Text style={{ marginTop: '5px' }} font="medium">
    Jenkin Artifact
  </Text>
)

const iconCardBody = (
  <CardBody.Icon icon="service-kubernetes" iconSize={25}>
    {content}
  </CardBody.Icon>
)

const menuCardBody = (
  <CardBody.Menu colorIdentifier={'red'} title="Jenkins Artifact" menuContent={<div>Menu</div>}>
    {content}
  </CardBody.Menu>
)

describe('Card test', () => {
  test('should render cards with no props', () => {
    const { container } = render(<Card>{content}</Card>)
    expect(container).toMatchSnapshot()
  })
  test('should render cards with props selected and interactive', () => {
    const { container } = render(
      <Card selected={true} interactive={true}>
        {content}
      </Card>
    )
    expect(container).toMatchSnapshot()
  })
  test('should render cards click handler', async () => {
    const onClick = jest.fn()
    const { container } = render(
      <Card selected={true} interactive={true} onClick={onClick}>
        {content}
      </Card>
    )
    fireEvent.click(container.children[0])
    await wait()
    expect(onClick).toHaveBeenCalled()
  })
})

describe('Card icon test', () => {
  test('should render icon card with no props', () => {
    const { container } = render(<Card>{iconCardBody}</Card>)
    expect(container).toMatchSnapshot()
  })
  test('should render cards with props selected and interactive', () => {
    const { container } = render(
      <Card selected={true} interactive={true}>
        {iconCardBody}
      </Card>
    )
    expect(container).toMatchSnapshot()
  })
  test('should render cards click handler', async () => {
    const onClick = jest.fn()
    const { container } = render(
      <Card selected={true} interactive={true} onClick={onClick}>
        {iconCardBody}
      </Card>
    )
    fireEvent.click(container.children[0])
    await wait()
    expect(onClick).toHaveBeenCalled()
  })
})

describe('Card menu test', () => {
  test('should render icon card with no props', () => {
    const { container } = render(<Card>{menuCardBody}</Card>)
    expect(container).toMatchSnapshot()
  })
  test('should render cards with props selected and interactive', () => {
    const { container } = render(
      <Card selected={true} interactive={true}>
        {menuCardBody}
      </Card>
    )
    expect(container).toMatchSnapshot()
  })
  test('should render cards click handler', async () => {
    const onClick = jest.fn()
    const { container } = render(
      <Card selected={true} interactive={true} onClick={onClick}>
        {menuCardBody}
      </Card>
    )
    fireEvent.click(container.children[0])
    await wait()
    expect(onClick).toHaveBeenCalled()
  })
})
