import React from 'react'
import { toPath } from 'lodash-es'

import type { AccordionProps, AccordionPanelProps } from './Accordion'
import { AccordionPanelWithRef as AccordionPanel } from './Accordion'

export interface NestedAccordionContextData<T extends string = string> {
  readonly panelStatus: Record<T, boolean>
  togglePanel(id: string): void
  openNestedPath(path: string): void
}

const NestedAccordionContext = React.createContext<NestedAccordionContextData>({
  panelStatus: {},
  togglePanel: () => void 0,
  openNestedPath: () => void 0
})

export function useNestedAccordion(): NestedAccordionContextData {
  return React.useContext(NestedAccordionContext)
}

export function NestedAccordionProvider(props: React.PropsWithChildren<unknown>): React.ReactElement {
  const [panelStatus, setPanelStatus] = React.useState<Record<string, boolean>>({})

  const togglePanel = React.useCallback((id: string) => {
    setPanelStatus(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const openNestedPath = React.useCallback((id: string) => {
    const pathsArr = toPath(id)

    const allPaths: string[] = []

    while (pathsArr.length > 0) {
      allPaths.push(pathsArr.join('.'))
      pathsArr.pop()
    }

    setPanelStatus(prev => ({
      ...prev,
      ...Object.fromEntries(allPaths.map(key => [key, true]))
    }))
  }, [])

  return (
    <NestedAccordionContext.Provider value={{ panelStatus, togglePanel, openNestedPath }}>
      {props.children}
    </NestedAccordionContext.Provider>
  )
}

export interface NestedAccordionPanelProps
  extends AccordionPanelProps,
    Omit<AccordionProps, 'children' | 'activeId' | 'className'> {
  isDefaultOpen?: boolean
  noAutoScroll?: boolean
}

export function NestedAccordionPanel(props: NestedAccordionPanelProps): React.ReactElement {
  const { panelStatus, togglePanel, openNestedPath } = useNestedAccordion()
  const isOpen = !!panelStatus[props.id]
  const elem = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (props.isDefaultOpen) {
      openNestedPath(props.id)
    }
  }, [])

  React.useLayoutEffect(() => {
    if (!props.noAutoScroll && isOpen && elem.current) {
      elem.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isOpen, props.noAutoScroll])

  return <AccordionPanel {...props} ref={elem} isOpen={isOpen} togglePanel={() => togglePanel(props.id)} />
}
