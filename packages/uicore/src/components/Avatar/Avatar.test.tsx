/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Avatar } from './Avatar'
import { getInitialsFromNameOrEmail, getSumOfAllCharacters } from './utils'

import { Color } from '@harness/design-system'

describe('Render basic component', () => {
  test('should check snapshot with name', () => {
    const { container } = render(<Avatar backgroundColor={Color.RED_100} name="John Doe" />)
    expect(container).toMatchSnapshot()
  })
  test('should check snapshot with email', () => {
    const { container } = render(<Avatar backgroundColor={Color.RED_100} email="John.Doe@harness.io" />)
    expect(container).toMatchSnapshot()
  })
  test('should check snapshot with image', () => {
    const { container } = render(
      <Avatar backgroundColor={Color.RED_100} src="https://www.mangaship.com/Content/img/human-avatar.png" />
    )
    expect(container).toMatchSnapshot()
  })
  test('getInitials with name', () => {
    expect(getInitialsFromNameOrEmail('All Name Here')).toEqual('AH')
    expect(getInitialsFromNameOrEmail('All Name')).toEqual('AN')
    expect(getInitialsFromNameOrEmail('AllNameHere')).toEqual('A')
    // eslint-disable-next-line
    // @ts-ignore
    expect(getInitialsFromNameOrEmail('AllNameHere', null)).toEqual('A')
  })
  test('getInitials with email', () => {
    expect(getInitialsFromNameOrEmail('', 'AllNameHere@com')).toEqual('A')
    expect(getInitialsFromNameOrEmail('', 'AllName.here@com')).toEqual('Ah')
    expect(getInitialsFromNameOrEmail(undefined, 'abc')).toEqual('a')
    // eslint-disable-next-line
    // @ts-ignore
    expect(getInitialsFromNameOrEmail(null, 'abc')).toEqual('a')
    // eslint-disable-next-line
    // @ts-ignore
    expect(getInitialsFromNameOrEmail(null, null)).toEqual(undefined)
  })
  test('getSumofCharacters', () => {
    expect(getSumOfAllCharacters('abcd')).toEqual(10)
    expect(getSumOfAllCharacters('Abcd')).toEqual(10)
    expect(getSumOfAllCharacters('')).toEqual(0)
  })
})
