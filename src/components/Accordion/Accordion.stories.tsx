import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Button, IButtonProps } from '@blueprintjs/core'

import { Accordion, AccordionProps } from './Accordion'
import { NestedAccordionProvider, NestedAccordionPanel, useNestedAccordion } from './NestedAccordion'

const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi temporibus error, id recusandae doloribus earum inventore, soluta fugit quidem nulla labore optio incidunt quis facilis. Rem illum unde tempore tempora.`

export default {
  title: 'Components/Accordion',
  component: Accordion
} as Meta

export const Basic: Story<AccordionProps> = args => (
  <Accordion {...args}>
    <Accordion.Panel id="1" details={text} summary="Panel 1" />
    <Accordion.Panel id="2" details={text} summary="Panel 2" />
    <Accordion.Panel id="3" details={text} summary="Panel 3" />
  </Accordion>
)

Basic.args = {
  activeId: '1'
}

function ToggleButton(props: { id: string } & Omit<IButtonProps, 'onClick'>): React.ReactElement {
  const { openNestedPath } = useNestedAccordion()

  return <Button {...props} onClick={() => openNestedPath(props.id)} />
}

export const Nested: Story<unknown> = _ => (
  <NestedAccordionProvider>
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
      <div>
        <ToggleButton id="panel-1" text="Open Panel 1" />
        <ToggleButton id="panel-1.panel-1-1" text="Open Panel 1.1 (Netsed)" />
        <ToggleButton id="panel-2" text="Open Panel 2" />
        <ToggleButton id="panel-3" text="Open Panel 3" />
        <ToggleButton id="panel-4" text="Open Panel 4" />
        <ToggleButton id="panel-5" text="Open Panel 5" />
      </div>
      <div>
        <NestedAccordionPanel
          id="panel-1"
          details={
            <div>
              <div>{text}</div>
              <br />
              <NestedAccordionPanel id="panel-1-1" details={text} summary="Panel 1.1" />
            </div>
          }
          summary="Panel 1"
        />
        <NestedAccordionPanel id="panel-2" details={text} summary="Panel 2" />
        <NestedAccordionPanel id="panel-3" details={text} summary="Panel 3" />
        <NestedAccordionPanel id="panel-4" details={text} summary="Panel 4" />
        <NestedAccordionPanel id="panel-5" details={text} summary="Panel 5" />
      </div>
    </div>
  </NestedAccordionProvider>
)
