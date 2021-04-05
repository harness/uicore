import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { MultiLogsViewer, MultiLogsViewerProps, Text, Color } from '../..'
import { omit } from 'lodash-es'

export default {
  title: 'Components / MultiLogsViewer',

  component: MultiLogsViewer,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>MultiLogsViewer</Title>
            <Subtitle>
              <pre>
                <code>{`import {MultiLogsViewer} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta
export const ShortLogs: Story<MultiLogsViewerProps> = args => {
  const {
    numberOfLogSections = 4,
    titleForSection = (sectionIndex: any) => {
      switch (sectionIndex) {
        case 0:
          return 'Set up job'
        case 1:
          return 'Run actions/checkout@v2'
        case 2:
          return 'Run make'
        case 3:
          return 'Complete job'
      }
    },
    isSectionOpen = (sectionIndex: any) => sectionIndex === 1,
    rightElementForSection = (_sectionIndex: any) => {
      return <Text color={Color.GREY_100}>2m 38s</Text>
    },
    logContentForSection = (_sectionIndex: any) => {
      return 'gyp ERR! stack Error: `gyp` failed with exit code: 1\ngyp ERR! System Darwin 19.6.0\ngyp ERR! node -v v14.5.0\nnode-pre-gyp ERR! not ok\nFailed to execute node-gyp'
    },
    sectionArr = [false, true, false, false]
  } = args
  const argsCopy = omit(args, [
    'numberOfLogSections',
    'titleForSection',
    'isSectionOpen',
    'rightElementForSection',
    'logContentForSection',
    'sectionArr'
  ])
  return (
    <MultiLogsViewer
      numberOfLogSections={numberOfLogSections}
      titleForSection={titleForSection}
      isSectionOpen={isSectionOpen}
      rightElementForSection={rightElementForSection}
      logContentForSection={logContentForSection}
      sectionArr={sectionArr}
      {...argsCopy}
    />
  )
}
ShortLogs.args = {
  numberOfLogSections: 4,
  titleForSection: (sectionIndex: any) => {
    switch (sectionIndex) {
      case 0:
        return 'Set up job'
      case 1:
        return 'Run actions/checkout@v2'
      case 2:
        return 'Run make'
      case 3:
        return 'Complete job'
    }
  },
  isSectionOpen: (sectionIndex: any) => sectionIndex === 1,
  logContentForSection: (_sectionIndex: any) => {
    return 'gyp ERR! stack Error: `gyp` failed with exit code: 1\ngyp ERR! System Darwin 19.6.0\ngyp ERR! node -v v14.5.0\nnode-pre-gyp ERR! not ok\nFailed to execute node-gyp'
  },
  sectionArr: [false, true, false, false]
}
export const LoglogsWithASCIIEscapes: Story<MultiLogsViewerProps> = args => {
  const {
    numberOfLogSections = 4,
    titleForSection = (sectionIndex: any) => {
      switch (sectionIndex) {
        case 0:
          return <Text color={Color.RED_500}>Set up job</Text>
        case 1:
          return 'Run actions/checkout@v2'
        case 2:
          return 'Run make'
        case 3:
          return 'Complete job'
      }
    },
    isSectionOpen = (sectionIndex: any) => sectionIndex === 0,
    rightElementForSection = (_sectionIndex: any) => {
      return <Text color={Color.GREY_100}>2m 38s</Text>
    },
    logContentForSection = (_sectionIndex: any) => {
      return `<script>alert(1);</script>\n\n\n\nHello from \x1B[1;3;31mxterm.js\x1B[0m Hello from \x1B[1;3;31mxterm.js\x1B[0mHello from \x1B[1;3;31mxterm.js\x1B[0mHello from
        \x1B[1;3;31mxterm.js\x1B[0mHello from \x1B[1;3;31mxterm.js\x1B[0mHello from \x1B[1;3;31mxterm.js\x1B[0mHello from \x1B[1;3;31mxterm.js\x1B[0mHello from \x1B[1;3;31mxterm.js\x1B[0mHello 
            too.\n\n\n\nCheckout https://harness.io\n\nhello\n\nworld\n\nRunning....\n\nnpm install foobar\n\n\nProgress: 50%... Please wait...         `
    },
    sectionArr = [true, false, false, false]
  } = args
  const argsCopy = omit(args, [
    'numberOfLogSections',
    'titleForSection',
    'isSectionOpen',
    'rightElementForSection',
    'logContentForSection',
    'sectionArr'
  ])
  return (
    <MultiLogsViewer
      numberOfLogSections={numberOfLogSections}
      titleForSection={titleForSection}
      isSectionOpen={isSectionOpen}
      rightElementForSection={rightElementForSection}
      logContentForSection={logContentForSection}
      sectionArr={sectionArr}
      {...argsCopy}
    />
  )
}
export const ScrollbacklinesPerformanceCustomIconEtc: Story<MultiLogsViewerProps> = args => {
  const {
    numberOfLogSections = 4,

    scrollbackLines = 100000,
    titleForSection = (sectionIndex: any) => {
      switch (sectionIndex) {
        case 0:
          return (
            <Text color={Color.RED_500} icon="spinner">
              Set up job
            </Text>
          )
        case 1:
          return 'Run actions/checkout@v2'
        case 2:
          return 'Run make'
        case 3:
          return 'Complete job'
      }
    },
    isSectionOpen = (sectionIndex: any) => sectionIndex === 0,
    rightElementForSection = (_sectionIndex: any) => {
      return <Text color={Color.GREY_100}>2m 38s</Text>
    },
    logContentForSection = (_sectionIndex: any) => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return Array.from({ length: 250000 }, (_v, k) => 'line ' + (k + 1)).join('\n')
    },
    sectionArr = [true, false, false, false]
  } = args
  const argsCopy = omit(args, [
    'numberOfLogSections',
    'titleForSection',
    'isSectionOpen',
    'rightElementForSection',
    'logContentForSection',
    'sectionArr',
    'scrollbackLines'
  ])
  return (
    <MultiLogsViewer
      scrollbackLines={scrollbackLines}
      numberOfLogSections={numberOfLogSections}
      titleForSection={titleForSection}
      isSectionOpen={isSectionOpen}
      rightElementForSection={rightElementForSection}
      logContentForSection={logContentForSection}
      sectionArr={sectionArr}
      {...argsCopy}
    />
  )
}
