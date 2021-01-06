import React, { useEffect, useMemo, useRef, useState } from 'react'
import { isEqual } from 'lodash'
import { Container, ContainerProps } from '../Container/Container'
import { Terminal } from 'xterm'
import { SearchAddon } from 'xterm-addon-search'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { Layout } from '../../layouts/Layout'
import { Icon } from '../../icons/Icon'
import { Text } from '../Text/Text'
import { FlexExpander } from '../FlexExpander/FlexExpander'
import css from './MultiLogsViewer.css'
import cx from 'classnames'
import { Color } from '../../core/Color'
import 'xterm/css/xterm.css'
const DEFAULT_SCROLLBACK_LINES = 1000

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

  /** loading/progress indicator */
  loading?: boolean

  /** Section title */
  title: React.ReactElement

  /** Right element (mostly will be duration) */
  rightElement: React.ReactElement

  /** Log content as string. Note that we can support streaming easily if backend has it */
  content: string
  /** Current highlighted index of search result */
  highlightedIndex?: number

  /* update panel to either collapse/expand  */
  updateSection?: (currentIndex: number, prevIndex?: number) => void

  /* toggle pane */
  toggle?: () => void

  /* active panel - panel which is expanded */
  activePanel?: number
}

export interface MultiLogsViewerProps extends ContainerProps {
  /** Number of visible rows */
  rows?: LogSectionProps['rows']

  /** loading/progress indicator */
  loadingIndex?: number

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
  titleForSection: (sectionIndex: number) => any

  /** Right element for a log section */
  rightElementForSection: (sectionIndex: number) => React.ReactElement

  /** Log content for a log section */
  logContentForSection: (sectionIndex: number) => string
  /** Current highlighted index of search result */
  highlightedIndex?: number
  /* update panel to either collapse/expand  */
  updateSection?: (currentIndex: number, prevIndex?: number) => void

  /* toggle pane */
  toggleSection?: (index: number) => void

  /* active panel - panel which is expanded */
  activePanel?: number
  /* Section Arr - this indicates if the section is expanded or collapsed  */
  sectionArr: boolean[]
}

interface Selection {
  startRow: number
  endRow: number
  startColumn: number
  endColumn: number
}

export const LogSection: React.FC<LogSectionProps> = ({
  title,
  scrollbackLines,
  rows = 25,
  rightElement,
  searchText,
  content,
  isOpen: isSectionOpen,
  searchDir = '',
  highlightedIndex = -1,
  activePanel = -1,
  loading = false,
  updateSection = () => undefined,
  toggle = () => undefined
}) => {
  const [isOpen, setIsOpen] = useState(isSectionOpen)
  const ref = useRef<HTMLDivElement | null>(null)
  const [currentSelection, setCurrentSelection] = useState<Selection | null>(null)
  const [prevSelection, setPrevSelection] = useState<Selection | null>(null)
  const [currentLines, setCurrentLines] = useState<string[]>([])

  const lines = useMemo(() => content.split(/\r?\n/), [content])

  useEffect(() => {
    setIsOpen(isSectionOpen)
  }, [isSectionOpen])

  const term = useMemo(
    () =>
      new Terminal({
        allowTransparency: true,
        rows: rows,
        theme: {
          background: 'transparent'
        }
      }),
    [isOpen]
  )
  const searchAddon = useMemo(() => new SearchAddon(), [])
  // const fitAddon = useMemo(() => new FitAddon(), [isOpen])
  const webLinksAddon = useMemo(() => new WebLinksAddon(), [isOpen])
  term.loadAddon(searchAddon)
  searchAddon.activate(term)
  term.loadAddon(webLinksAddon)

  useEffect(() => {
    if (isOpen) {
      term.clear()
      term.open(ref?.current as HTMLDivElement)

      term.write('\x1b[?25l') // disable cursor
      term.setOption('disableStdin', true)
      term.setOption('scrollback', scrollbackLines || DEFAULT_SCROLLBACK_LINES)
    }

    if (!isOpen) {
      setCurrentLines([])
    }
  }, [ref, isOpen])

  const isSubsetFromBegining = (subsetArr: string[], arr: string[]): boolean => {
    if (subsetArr.length > arr.length) return false

    let isSubset = true
    subsetArr.forEach((subsetItem, index) => {
      if (arr[index] !== subsetItem) {
        isSubset = false
        return
      }
    })

    return isSubset
  }

  // NOTE: logic for append log rows (or recreate if lines are not subset of existing lines)
  useEffect(() => {
    if (isOpen) {
      if (isSubsetFromBegining(currentLines, lines)) {
        // ADD NEW LINES
        // console.log('append rows')
        for (let i = currentLines.length; i < lines.length; i++) {
          term.writeln(`\x1B[1;30m${String(i + 1).padStart(4)}\x1B[0m ${lines[i]}`)
        }
        setCurrentLines([...lines])
      } else {
        // RECREATE
        // console.log('recreate')
        term.clear()
        for (let i = 0; i < lines.length; i++) {
          term.writeln(`\x1B[1;30m${String(i + 1).padStart(4)}\x1B[0m ${lines[i]}`)
        }
        setCurrentLines([...lines])
      }
    } else {
      setCurrentLines([])
    }
  }, [lines, isOpen])

  useEffect(() => {
    if (!currentSelection || !prevSelection) {
      return
    }
    /* If the search dir is next  
      the next selection is at 0 and the current Selection is at the last row 
      then expand the next section
    */
    if (activePanel > -1) {
      if (
        currentSelection?.startRow <= prevSelection?.startRow &&
        currentSelection?.startColumn <= prevSelection?.startColumn &&
        searchDir === 'next'
      ) {
        updateSection(activePanel, activePanel + 1)
        setIsOpen(false)
      } else if (
        currentSelection?.startRow >= prevSelection?.startRow &&
        currentSelection?.startColumn >= prevSelection?.startColumn &&
        searchDir === 'prev'
      ) {
        /* If the search dir is prev
         the nextRow is 4 and prevSelection is 0
        then expand the prev section
      */
        updateSection(activePanel, activePanel - 1)
        setIsOpen(false)
      }
    }
  }, [currentSelection])

  useEffect(() => {
    if (searchDir && activePanel === -1) {
      setIsOpen(!isOpen)
      updateSection(activePanel, activePanel + 1)
    }
  }, [searchDir])

  const setCurrentPosition = () => {
    const pos: any = term.getSelectionPosition()
    // setPrevSelection
    setPrevSelection(currentSelection)
    // Set current selection
    setCurrentSelection(pos)
  }

  const onNext = () => {
    if (searchText) {
      const hasNext = searchAddon.findNext(searchText, { caseSensitive: false })
      if (hasNext) {
        setCurrentPosition()
      }
    }
  }

  const onPrev = () => {
    if (searchText) {
      const hasPrev = searchAddon.findPrevious(searchText, { caseSensitive: false })
      if (hasPrev) {
        setCurrentPosition()
      }
    }
  }

  useEffect(() => {
    // If hightlightedIndex is greater than -1
    if (highlightedIndex > -1) {
      if (searchDir.includes('next')) {
        onNext()
      } else if (searchDir.includes('prev')) {
        onPrev()
      }
    }
  }, [searchDir, highlightedIndex])

  return (
    <Container className={css.section}>
      <Layout.Horizontal
        spacing="small"
        onClick={() => {
          setIsOpen(!isOpen)
          toggle()
        }}
        tabIndex={-1}
        className={cx(css.sectionHeader, isOpen && css.isOpen)}>
        <Icon
          className={css.chevron}
          color={Color.GREY_100}
          name={isOpen ? 'chevron-down' : 'chevron-right'}
          size={16}
        />
        {typeof title === 'string' ? <Text color={Color.GREY_100}>{title}</Text> : title}
        {loading ? <Icon color={Color.GREY_100} name={'spinner'} size={16} /> : null}
        <FlexExpander />
        {rightElement}
      </Layout.Horizontal>

      {isOpen && <Container ref={ref} className={css.term}></Container>}
    </Container>
  )
}

export const MultiLogsViewer: React.FC<MultiLogsViewerProps> = ({
  rows,
  numberOfLogSections,
  isSectionOpen,
  titleForSection,
  rightElementForSection,
  logContentForSection,
  className,
  scrollbackLines,
  searchText,
  highlightedIndex,
  searchDir,
  updateSection,
  toggleSection,
  sectionArr = [false],
  activePanel,
  loadingIndex = -1,
  ...containerProps
}) => {
  const [isOpenArr, setIsOpenArr] = useState(sectionArr)

  useEffect(() => {
    if (!isEqual(isOpenArr, sectionArr)) {
      setIsOpenArr(sectionArr)
    }
  }, [sectionArr])

  return (
    <Container className={cx(className, css.container)} {...containerProps} key={activePanel}>
      <Layout.Vertical>
        {Array.from({ length: numberOfLogSections }, (_v, k) => k).map(index => {
          const title = titleForSection(index)
          const rightElement = rightElementForSection(index)
          const logContent = logContentForSection(index)
          const isOpen = isOpenArr[index]
          return (
            <LogSection
              key={index}
              isOpen={isOpen}
              rows={rows}
              scrollbackLines={scrollbackLines}
              title={title}
              rightElement={rightElement}
              content={logContent}
              searchText={searchText}
              searchDir={searchDir}
              highlightedIndex={highlightedIndex}
              toggle={() => {
                toggleSection?.(index)
              }}
              updateSection={(currentIndex, nextIndex = -1) => {
                updateSection?.(currentIndex, nextIndex)
                setIsOpenArr([...sectionArr])
              }}
              activePanel={activePanel}
              loading={loadingIndex === index}
            />
          )
        })}
      </Layout.Vertical>
    </Container>
  )
}
