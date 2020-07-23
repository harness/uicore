import React, { useState, useLayoutEffect, useRef, useCallback, RefObject } from 'react'
import { Container } from '../Container/Container'
import { Heading } from '../Heading/Heading'
import { Button } from '../Button/Button'
import css from './StackTraceList.css'
import cx from 'classnames'
import { Color } from '../../core/Color'

export interface StackTracePanelProps {
  stackTrace: string
  className?: string
}

export interface StackTraceListProps {
  stackTraceList: string[]
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

  return (
    <Container className={cx(css.panel, className)}>
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
  const { stackTraceList = [], heading, listContainerHeight, className, stackTracePanelClassName } = props
  return (
    <Container className={cx(css.main, className)}>
      {heading && (
        <Heading level={3} padding="small" background={Color.GREY_100}>
          {heading}
        </Heading>
      )}
      <Container className={css.listContainer} height={listContainerHeight}>
        {stackTraceList.map(stackTrace =>
          stackTrace?.length ? (
            <StackTracePanel key={stackTrace} stackTrace={stackTrace} className={stackTracePanelClassName} />
          ) : (
            undefined
          )
        )}
      </Container>
    </Container>
  )
}
