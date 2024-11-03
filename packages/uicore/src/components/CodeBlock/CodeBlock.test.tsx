/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeBlock } from './CodeBlock'
import copy from 'clipboard-copy'

jest.mock('clipboard-copy', () => jest.fn())

describe('Code Block', () => {
  test('should render with just snippet props', () => {
    const { container } = render(
      <CodeBlock snippet={'You may have to wait upto 2 mins for the delegate to come initialize.'} />
    )
    expect(container).toMatchSnapshot()
  })
  test('should render codeblock with code formatter', () => {
    const { container } = render(<CodeBlock format="pre" snippet={'kubectl apply -f harness-delegate.yaml'} />)
    expect(container).toMatchSnapshot()
  })
  test('should render codeblock with code copy option', async () => {
    const { container } = render(
      <CodeBlock format="pre" allowCopy snippet={'kubectl apply -f harness-delegate.yaml'} />
    )
    const copybutton = document.querySelector('button')
    expect(copybutton).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  test('should render codeblock with code copy and trigger onCopySuccess', async () => {
    const onCopySuccess = jest.fn()
    const copyContent = 'kubectl apply -f harness-delegate.yaml'
    const { getByRole } = render(
      <CodeBlock format="pre" allowCopy snippet={copyContent} onCopySuccess={onCopySuccess} />
    )
    const copyButton = getByRole('button')
    await userEvent.click(copyButton)
    expect(copy).toHaveBeenCalledWith(copyContent)
    expect(onCopySuccess).toHaveBeenCalledWith(copyContent)
  })
})
