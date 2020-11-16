import React, { useState, useLayoutEffect, useRef, useCallback, RefObject } from 'react'
import { Container } from '../Container/Container'
import { Heading } from '../Heading/Heading'
import { Link } from '../Link/Link'
import css from './StackTraceList.css'
import cx from 'classnames'
import { Color } from '../../core/Color'
import { Text } from '../Text/Text'

type StackTrace = string | { timestamp?: string; stackTrace?: string }

export interface StackTracePanelProps {
  stackTrace: string | { timestamp?: string; stackTrace?: string }
  className?: string
}

export interface StackTraceListProps {
  stackTraceList: StackTrace[]
  heading?: string
  listContainerHeight?: number
  className?: string
  stackTracePanelClassName?: string
}

export function useExpandibleHook(htmlElementRef: RefObject<HTMLElement>) {
  const [isExpandible, setIsExpandible] = useState(false)
  useLayoutEffect(() => {
    if ((htmlElementRef.current?.scrollHeight || 0) - (htmlElementRef.current?.offsetHeight || 0) > 0) {
      setIsExpandible(true)
    }
  })

  return isExpandible
}

export function StackTracePanel(props: StackTracePanelProps) {
  const { stackTrace = '', className } = props
  const [isCollapsed, setCollapsed] = useState(true)
  const onCollapseHandler = useCallback(() => () => setCollapsed(!isCollapsed), [isCollapsed])
  const textContentRef = useRef<HTMLPreElement>(null)
  const isExpandible = useExpandibleHook(textContentRef)

  let stackTraceString = stackTrace
  let timestamp: string | undefined = undefined
  if (typeof stackTrace === 'object') {
    stackTraceString = stackTrace.stackTrace || ''
    timestamp = stackTrace.timestamp
  }

  return (
    <Container className={cx(css.panel, className)}>
      <Container className={cx(css.textContainer, isExpandible ? css.isExpandible : undefined)}>
        {timestamp && <Text className={css.timestamp}>{timestamp}</Text>}
        <pre className={css.textContent} data-is-collapsed={isCollapsed} ref={textContentRef}>
          {stackTraceString}
        </pre>
      </Container>
      {isExpandible && (
        <Link
          withoutHref={true}
          minimal
          intent="primary"
          className={css.collapseButtonText}
          icon={isCollapsed ? 'double-chevron-down' : 'double-chevron-up'}
          iconProps={{
            size: 12
          }}
          onClick={onCollapseHandler()}>
          {isCollapsed ? 'Show All' : 'Collapse'}
        </Link>
      )}
    </Container>
  )
}

export function StackTraceList(props: StackTraceListProps) {
  const { stackTraceList = [], heading, listContainerHeight, className, stackTracePanelClassName } = props
  return (
    <Container className={cx(css.main, className)}>
      {heading && (
        <Heading level={3} padding="small" background={Color.GREY_100}>
          {heading}
        </Heading>
      )}
      <Container className={css.listContainer} height={listContainerHeight}>
        {stackTraceList.map(stackTraceObj =>
          stackTraceObj ? (
            <StackTracePanel
              key={typeof stackTraceObj === 'string' ? stackTraceObj : stackTraceObj.stackTrace}
              stackTrace={stackTraceObj}
              className={stackTracePanelClassName}
            />
          ) : (
            undefined
          )
        )}
      </Container>
    </Container>
  )
}
