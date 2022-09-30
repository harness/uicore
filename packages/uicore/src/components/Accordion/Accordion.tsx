/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Collapse, ICollapseProps } from '@blueprintjs/core'
import cx from 'classnames'

import css from './Accordion.css'

const noop = () => void 0

export interface AccordionPanelProps {
  id: string
  details: React.ReactNode
  summary: React.ReactNode
  addDomId?: boolean
  disabled?: boolean
}

export interface AccordionPanelInternalProps extends Omit<AccordionProps, 'children' | 'activeId' | 'className'> {
  isOpen?: boolean
  togglePanel(): void
}

export const AccordionPanelWithRef = React.forwardRef(AccordionPanel)

function AccordionPanel(
  props: AccordionPanelProps & AccordionPanelInternalProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const {
    summary,
    details,
    togglePanel,
    isOpen,
    id,
    collapseProps,
    addDomId,
    disabled,
    panelClassName,
    summaryClassName,
    detailsClassName,
    chevronClassName
  } = props

  return (
    <div
      ref={ref}
      data-testid={`${id}-panel`}
      data-disabled={disabled}
      className={cx(css.panel, panelClassName)}
      data-open={isOpen}
      id={addDomId ? `${id}-panel` : undefined}>
      <div data-testid={`${id}-summary`} onClick={togglePanel} className={cx(css.summary, summaryClassName)}>
        <div className={cx({ [css.label]: typeof summary === 'string' })}>{summary}</div>
        <div className={cx(css.chevron, chevronClassName)} />
      </div>
      <Collapse {...collapseProps} className={cx(css.collapse, collapseProps?.className)} isOpen={isOpen}>
        <div data-testid={`${id}-details`} className={cx(css.details, detailsClassName)}>
          {details}
        </div>
      </Collapse>
    </div>
  )
}

export interface AccordionProps {
  children: React.ReactNode
  activeId?: string
  className?: string
  panelClassName?: string
  summaryClassName?: string
  detailsClassName?: string
  chevronClassName?: string
  collapseProps?: Omit<ICollapseProps, 'isOpen'>
  allowMultiOpen?: boolean
  onChange?(tabs: string | string[]): void
}

export interface AccordionHandle {
  open(tab: string | string[]): void
  close(tab: string | string[]): void
  toggle(tab: string | string[]): void
}

export function AccordionWithoutRef(
  props: AccordionProps,
  ref: React.ForwardedRef<AccordionHandle>
): React.ReactElement {
  const { children, allowMultiOpen, className, activeId, onChange, ...rest } = props
  const [activePanels, setActivePanels] = React.useState<Record<string, boolean>>(
    typeof activeId === 'string' ? { [activeId]: true } : {}
  )

  function togglePanels(id: string) {
    return () => {
      setActivePanels(prev => ({ ...(allowMultiOpen ? prev : {}), [id]: !prev[id] }))
    }
  }

  function resolveTabs(tab: string | string[]): string[] {
    let tabs = Array.isArray(tab) ? tab : [tab]

    if (!allowMultiOpen) {
      tabs = tabs.slice(0, 1)
    }

    return tabs
  }

  React.useEffect(() => {
    const activeIds = Object.keys(activePanels).filter(panel => activePanels[panel])

    onChange?.(allowMultiOpen ? activeIds : activeIds[0])
  }, [activePanels])

  React.useImperativeHandle(ref, () => ({
    open(tab: string | string[]): void {
      const tabs = resolveTabs(tab)

      setActivePanels(prev => {
        const newData = tabs.reduce((p, c) => ({ ...p, [c]: true }), {})

        return { ...(allowMultiOpen ? prev : {}), ...newData }
      })
    },
    close(tab: string | string[]): void {
      const tabs = resolveTabs(tab)
      setActivePanels(prev => {
        const newData = tabs.reduce((p, c) => ({ ...p, [c]: false }), {})

        return { ...(allowMultiOpen ? prev : {}), ...newData }
      })
    },
    toggle(tab: string | string[]): void {
      const tabs = resolveTabs(tab)

      setActivePanels(prev => {
        const newData = tabs.reduce((p, c) => ({ ...p, [c]: !prev[c] }), {})

        return { ...(allowMultiOpen ? prev : {}), ...newData }
      })
    }
  }))

  return (
    <div className={cx(css.accordion, className)}>
      {React.Children.toArray(children)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter(child => (child as any).type === Accordion.Panel)
        .map(child => {
          const { props: childProps } = child as React.ReactElement<AccordionPanelProps>

          return (
            <AccordionPanelWithRef
              key={childProps.id}
              {...rest}
              {...childProps}
              isOpen={!!activePanels[childProps.id]}
              togglePanel={childProps.disabled ? noop : togglePanels(childProps.id)}
            />
          )
        })}
    </div>
  )
}

export type AccordionType = React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<AccordionHandle>> & {
  Panel: React.FC<AccordionPanelProps>
}

const Accordion: AccordionType = Object.assign(React.forwardRef(AccordionWithoutRef), {
  Panel(): React.ReactElement {
    return <div />
  }
})

Accordion.Panel.displayName = 'AccordionPanel'

export { Accordion }

/**
 <Accordion activeId="">
  <Accordion.Panel id="" summary={} details={}/>
  <Accordion.Panel id=""/>
  <Accordion.Panel/>
  <Accordion.Panel/>
 </Accordion>
 */
