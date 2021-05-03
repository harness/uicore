import React from 'react'
import { Collapse, ICollapseProps } from '@blueprintjs/core'
import cx from 'classnames'

import css from './Accordion.css'

export interface AccordionPanelProps {
  id: string
  details: React.ReactNode
  summary: React.ReactNode
  addDomId?: boolean
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
  const { summary, details, togglePanel, isOpen, id, collapseProps, addDomId } = props

  return (
    <div
      ref={ref}
      data-testid={`${id}-panel`}
      className={cx(css.panel, props.panelClassName)}
      data-open={isOpen}
      id={addDomId ? `${id}-panel` : undefined}>
      <div data-testid={`${id}-summary`} onClick={togglePanel} className={cx(css.summary, props.summaryClassName)}>
        <div className={css.chevron} />
        <div className={cx({ [css.label]: typeof summary === 'string' })}>{summary}</div>
      </div>
      <Collapse {...collapseProps} className={cx(css.collapse, collapseProps?.className)} isOpen={isOpen}>
        <div data-testid={`${id}-details`} className={cx(css.details, props.detailsClassName)}>
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
  collapseProps?: Omit<ICollapseProps, 'isOpen'>
  allowMultiOpen?: boolean
}

export function Accordion(props: AccordionProps): React.ReactElement {
  const { children, allowMultiOpen, className, activeId, ...rest } = props
  const [activePanels, setActivePanels] = React.useState<Record<string, boolean>>(
    typeof activeId === 'string' ? { [activeId]: true } : {}
  )

  function togglePanels(id: string) {
    return () => {
      setActivePanels(prev => ({ ...(allowMultiOpen ? prev : {}), [id]: !prev[id] }))
    }
  }

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
              togglePanel={togglePanels(childProps.id)}
            />
          )
        })}
    </div>
  )
}

const Panel: React.FC<AccordionPanelProps> = (): React.ReactElement => {
  return <div />
}
Accordion.Panel = Panel
Accordion.Panel.displayName = 'AccordionPanel'

/**
 <Accordion activeId="">
  <Accordion.Panel id="" summary={} details={}/>
  <Accordion.Panel id=""/>
  <Accordion.Panel/>
  <Accordion.Panel/>
 </Accordion>
 */
