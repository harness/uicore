/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { StringSubstitute } from '../StringSubstitute'

describe('StringSubstitute', () => {
  test('Basic substitution should be done properly', async () => {
    const { queryByText } = render(<StringSubstitute str="Some static text" vars={{}} />)
    expect(queryByText('Some static text')).toBeTruthy()

    render(<StringSubstitute str="{user}'s age is {age}" vars={{ user: 'Eric', age: 5 }} />)
    expect(queryByText("Eric's age is 5")).toBeTruthy()
  })

  test('Repeated substitute', async () => {
    const { queryByText } = render(
      <StringSubstitute
        str="{user}'s age is {age}. {user} is a {gender}"
        vars={{ user: 'Eric', age: 5, gender: 'male' }}
      />
    )
    expect(queryByText("Eric's age is 5. Eric is a male")).toBeTruthy()
  })

  test('Basic translation', async () => {
    const { queryByText } = render(
      <StringSubstitute
        str="{user} wants to merge {number} {number|1:commit,commits} into {target} from {source}"
        vars={{ user: 'Eric', number: 1, target: 'patch1', source: 'develop' }}
      />
    )
    expect(queryByText('Eric wants to merge 1 commit into patch1 from develop')).toBeTruthy()

    render(
      <StringSubstitute
        str="{user} wants to merge {number} {number|1:commit,commits} into {target} from {source}"
        vars={{ user: 'Eric', number: 25, target: 'patch1', source: 'develop' }}
      />
    )
    expect(queryByText('Eric wants to merge 25 commits into patch1 from develop')).toBeTruthy()
  })

  test('Multiple occurrences of translation', async () => {
    const { queryByText } = render(
      <StringSubstitute
        str="{number} {number|1:commit,commits} {number|1:is,are} done by {user}"
        vars={{ user: 'Eric', number: 1 }}
      />
    )
    expect(queryByText('1 commit is done by Eric')).toBeTruthy()

    render(
      <StringSubstitute
        str="{number} {number|1:commit,commits} {number|1:is,are} done by {user}"
        vars={{ user: 'Eric', number: 101 }}
      />
    )
    expect(queryByText('101 commits are done by Eric')).toBeTruthy()
  })

  test('Raw translation should be returned when vars are missing', async () => {
    const { queryByText } = render(
      <StringSubstitute
        str="{number} {number|1:commit,commits} {number|1:is,are} done by {user}"
        vars={{ user: 'Eric' }}
      />
    )
    expect(queryByText('{number} {number|1:commit,commits} {number|1:is,are} done by Eric')).toBeTruthy()

    render(<StringSubstitute str="{number} {number|1:commit,commits} {number|1:is,are} done by {user}" />)
    expect(queryByText('{number} {number|1:commit,commits} {number|1:is,are} done by {user}')).toBeTruthy()
  })
})
