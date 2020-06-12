import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { LogViewer } from './LogViewer'

describe('<LogViewer /> tests', () => {
  test('snapshot test default', () => {
    const { container } = render(
      <LogViewer
        logs={[
          { logLine: 'Initializing..\n\nNo values.yaml file found. Skipping template rendering.' },
          {
            logLine:
              '\u001b[1;91m\u001b[40mException while processing templates/service.yaml\u001b[0m\n\u001b[1;91m\u001b[40mClassCastException: java.lang.String cannot be cast to java.util.Map\u001b[0m\n\u001b[1;91m\u001b[40mClassCastException: java.lang.String cannot be cast to java.util.Map\u001b[0m'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
  test('snapshot test default loading', () => {
    const { container } = render(
      <LogViewer
        isLoading={true}
        logs={[
          { logLine: 'Initializing..\n\nNo values.yaml file found. Skipping template rendering.' },
          {
            logLine:
              '\u001b[1;91m\u001b[40mException while processing templates/service.yaml\u001b[0m\n\u001b[1;91m\u001b[40mClassCastException: java.lang.String cannot be cast to java.util.Map\u001b[0m\n\u001b[1;91m\u001b[40mClassCastException: java.lang.String cannot be cast to java.util.Map\u001b[0m'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
  test('snapshot test partial file', () => {
    const downloadSpy = jest.fn()
    const { container } = render(
      <LogViewer
        defaultOptions={{ LogLimit: 1 }}
        downloadLogs={downloadSpy}
        logs={[
          { logLine: 'Initializing..\n\nNo values.yaml file found. Skipping template rendering.' },
          {
            logLine:
              '\u001b[1;91m\u001b[40mException while processing templates/service.yaml\u001b[0m\n\u001b[1;91m\u001b[40mClassCastException: java.lang.String cannot be cast to java.util.Map\u001b[0m\n\u001b[1;91m\u001b[40mClassCastException: java.lang.String cannot be cast to java.util.Map\u001b[0m'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
    fireEvent.click(container.querySelector('button') as HTMLButtonElement)
    expect(downloadSpy).toHaveBeenCalled()
  })
})
