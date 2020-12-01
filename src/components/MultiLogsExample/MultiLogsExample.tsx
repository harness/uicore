import React, { useState } from 'react'
import { ContainerProps } from '../Container/Container'

import { MultiLogsViewer } from '../MultiLogsViewer/MultiLogsViewer'
import { Text } from '../Text/Text'
import { Color } from '../../core/Color'
import { ExpandingSearchInput } from '../ExpandingSearchInput/ExpandingSearchInput'

export interface LogSectionProps {
  /** Number of visible rows */
  rows?: number
  /** Search text */
  searchText?: string
  /** Direction of search - Next/Prev */
  searchDir?: string
  /** Number of scrollback lines */
  scrollbackLines?: number

  /** True to open log content */
  isOpen?: boolean

  /** Section title */
  title: React.ReactElement

  /** Right element (mostly will be duration) */
  rightElement: React.ReactElement

  /** Log content as string. Note that we can support streaming easily if backend has it */
  content: string
  /** Current highlighted index of search result */
  highlightedIndex?: number
}

export interface MultiLogsViewerProps extends ContainerProps {
  /** Number of visible rows */
  rows?: LogSectionProps['rows']

  /** Search text */
  searchText?: string
  /** Direction of search - Next/Prev */
  searchDir?: string

  /** Number of scrollback lines */
  scrollbackLines?: LogSectionProps['scrollbackLines']

  /** Number of log sections */
  numberOfLogSections: number

  /** Determine if a section's log is open */
  isSectionOpen: (sectionIndex: number) => boolean

  /** Title for a log section */
  titleForSection: (sectionIndex: number) => React.ReactElement

  /** Right element for a log section */
  rightElementForSection: (sectionIndex: number) => React.ReactElement

  /** Log content for a log section */
  logContentForSection: (sectionIndex: number) => string
  /** Current highlighted index of search result */
  highlightedIndex?: number
}

export const MultiLogsExample: React.FC<MultiLogsViewerProps> = () => {
  const [searchDir, setDir] = useState('')
  const [highlightInd, sethighlightInd] = useState(0)
  const [openedIndex, setOpenedIndex] = useState(0)
  const arr = Array.from({ length: 4 }, () => false)
  arr[0] = true

  const [panelArr, setPanelArr] = useState(arr)

  return (
    <>
      <ExpandingSearchInput />
      <button
        onClick={() => {
          setDir(`next`)
          sethighlightInd(highlightInd + 1)
        }}>
        Next
      </button>
      <button
        onClick={() => {
          setDir(`prev`)
          sethighlightInd(highlightInd - 1)
        }}>
        Prev
      </button>
      <MultiLogsViewer
        numberOfLogSections={4}
        titleForSection={sectionIndex => {
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
        }}
        sectionArr={panelArr}
        activePanel={openedIndex}
        isSectionOpen={(sectionIndex: number) => panelArr[sectionIndex]}
        rightElementForSection={() => {
          return <Text color={Color.GREY_100}>2m 38s</Text>
        }}
        logContentForSection={() => {
          return 'gyp ERR! stack Error: `gyp` failed with exit code: 1\ngyp ERR! System Darwin 19.6.0\ngyp ERR! node -v v14.5.0\nnode-pre-gyp ERR! not ok\nFailed to execute node-gyp'
        }}
        searchDir={searchDir}
        highlightedIndex={highlightInd}
        searchText="ERR"
        updateSection={(currentIndex: number, nextIndex = -1) => {
          if (nextIndex > -1) {
            panelArr[currentIndex] = false
            panelArr[nextIndex] = true
            setOpenedIndex(nextIndex)
          } else {
            panelArr[currentIndex] = !panelArr[currentIndex]
            if (!panelArr[currentIndex] && currentIndex === 0) {
              setOpenedIndex(-1)
            } else {
              setOpenedIndex(currentIndex)
            }
          }

          setPanelArr([...panelArr])
        }}
      />
    </>
  )
}
