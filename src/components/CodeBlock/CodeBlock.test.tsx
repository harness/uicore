import React from 'react'
import { render } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

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
})
