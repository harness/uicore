import React, { useState, useLayoutEffect, useRef, useCallback } from 'react'
import { Container } from '../Container/Container'
import { Heading } from '../Heading/Heading'
import { Button } from '../Button/Button'
import css from './StackTraceList.css'
import { Color } from '../../core/Color'

export interface StackTracePanelProps {
  stackTrace: string
}

export interface StackTraceListProps {
  stackTraceList: string[]
  heading?: string
  listContainerHeight?: number
}

export function StackTracePanel(props: StackTracePanelProps) {
  const { stackTrace = '' } = props
  const [isCollapsed, setCollapsed] = useState(true)
  const [isExpandible, setIsExpandible] = useState(false)
  const onCollapseHandler = useCallback(() => () => setCollapsed(!isCollapsed), [isCollapsed])
  const textContentRef = useRef<HTMLPreElement>(null)

  useLayoutEffect(() => {
    if ((textContentRef.current?.scrollHeight || 0) - (textContentRef.current?.offsetHeight || 0) > 0) {
      setIsExpandible(true)
      setCollapsed(true)
    }
  })
  return (
    <Container className={css.panel}>
      <Container className={css.textContainer}>
        <pre className={css.textContent} data-is-collapsed={isCollapsed} ref={textContentRef}>
          {stackTrace}
        </pre>
      </Container>
      {isExpandible && (
        <Button
          minimal
          width={100}
          intent="primary"
          icon={isCollapsed ? 'double-chevron-down' : 'double-chevron-up'}
          onClick={onCollapseHandler()}>
          {isCollapsed ? 'Show All' : 'Collapse'}
        </Button>
      )}
    </Container>
  )
}

export function StackTraceList(props: StackTraceListProps) {
  const { stackTraceList = [], heading, listContainerHeight } = props
  return (
    <Container className={css.main}>
      {heading && (
        <Heading level={3} padding="small" background={Color.GREY_100} className={css.heading}>
          {heading}
        </Heading>
      )}
      <Container className={css.listContainer} height={listContainerHeight}>
        {stackTraceList.map(stackTrace =>
          stackTrace?.length ? <StackTracePanel key={stackTrace} stackTrace={stackTrace} /> : undefined
        )}
      </Container>
    </Container>
  )
}
