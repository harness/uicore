/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Collapse, ICollapseProps } from '@blueprintjs/core'
import cx from 'classnames'

import css from './Accordion.css'

const noop = () => void 0

export enum ChevronPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface AccordionPanelProps {
  id: string
  details: React.ReactNode
  summary: React.ReactNode
  addDomId?: boolean
  disabled?: boolean
  className?: string
  shouldRender?: boolean | (() => boolean)
  chevronPosition?: ChevronPosition
}

export interface AccordionPanelInternalProps extends Omit<AccordionProps, 'children' | 'activeId' | 'className'> {
  isOpen?: boolean
  togglePanel(): void
}

export const AccordionPanelWithRef = React.forwardRef(AccordionPanel)

function AccordionPanel(
  props: AccordionPanelProps & AccordionPanelInternalProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement | null {
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
    chevronClassName,
    className,
    shouldRender,
    chevronPosition = ChevronPosition.RIGHT
  } = props

  if (typeof shouldRender === 'boolean' && !shouldRender) {
    return null
  }

  if (typeof shouldRender === 'function' && !shouldRender?.()) {
    return null
  }

  return (
    <div
      ref={ref}
      data-testid={`${id}-panel`}
      data-disabled={disabled}
      className={cx(css.panel, panelClassName, className)}
      data-open={isOpen}
      id={addDomId ? `${id}-panel` : undefined}>
      <div data-testid={`${id}-summary`} onClick={togglePanel} className={cx(css.summary, summaryClassName)}>
        {chevronPosition === ChevronPosition.LEFT && <div className={cx(css.chevron, chevronClassName)} />}
        <div
          className={cx({
            [css.label]: typeof summary === 'string',
            [css.iconPositionedLeft]: typeof summary === 'string' && chevronPosition === ChevronPosition.LEFT
          })}>
          {summary}
        </div>
        {chevronPosition === ChevronPosition.RIGHT && <div className={cx(css.chevron, chevronClassName)} />}
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
  /** Controlled accordion active ID which drives accordion state from onChange over internal toggle state  */
  controlledActiveId?: string
  chevronPosition?: ChevronPosition
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
  const { children, allowMultiOpen, className, activeId, onChange, controlledActiveId, ...rest } = props

  // Use the controlledActiveId prop to manage the active panels
  const [activePanels, setActivePanels] = React.useState<Record<string, boolean>>(() => {
    if (controlledActiveId) {
      return { [controlledActiveId]: true }
    }
    return typeof activeId === 'string' ? { [activeId]: true } : {}
  })

  // Handle changes in controlledActiveId prop
  React.useEffect(() => {
    if (controlledActiveId) {
      setActivePanels({ [controlledActiveId]: true })
    }
  }, [controlledActiveId])

  // Update the togglePanels function to check if controlledActiveId is set
  function togglePanels(id: string) {
    return () => {
      if (!controlledActiveId) {
        setActivePanels(prev => ({ ...(allowMultiOpen ? prev : {}), [id]: !prev[id] }))
      } else {
        onChange?.(id)
      }
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

    !controlledActiveId && onChange?.(allowMultiOpen ? activeIds : activeIds[0])
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
