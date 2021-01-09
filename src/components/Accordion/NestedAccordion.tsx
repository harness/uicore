import React from 'react'
import { toPath } from 'lodash-es'

import type { AccordionPanelProps } from './Accordion'
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
    const paths = toPath(id).reduce<Record<string, boolean>>((acc, curr) => ({ ...acc, [curr]: true }), {})

    setPanelStatus(prev => ({ ...prev, ...paths }))
  }, [])

  return (
    <NestedAccordionContext.Provider value={{ panelStatus, togglePanel, openNestedPath }}>
      {props.children}
    </NestedAccordionContext.Provider>
  )
}

export function NestedAccordionPanel(props: AccordionPanelProps): React.ReactElement {
  const { panelStatus, togglePanel } = useNestedAccordion()
  const isOpen = !!panelStatus[props.id]
  const elem = React.useRef<HTMLDivElement | null>(null)

  React.useLayoutEffect(() => {
    if (isOpen && elem.current) {
      elem.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isOpen])

  return <AccordionPanel {...props} ref={elem} isOpen={isOpen} togglePanel={() => togglePanel(props.id)} />
}
