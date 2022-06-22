/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
    <Accordion.Panel disabled id="3" details={text} summary="Panel 3" />
  </Accordion>
)

Basic.args = {
  activeId: '1',
  onChange(tabs) {
    // eslint-disable-next-line no-console
    console.log('changed tabs', tabs)
  }
}

function ToggleButton(props: { id: string } & Omit<IButtonProps, 'onClick'>): React.ReactElement {
  const { openNestedPath } = useNestedAccordion()

  return <Button {...props} onClick={() => openNestedPath(props.id)} />
}

export const Nested: Story<unknown> = _ => (
  <NestedAccordionProvider>
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
      <div>
        <ToggleButton id="panel_1" text="Open Panel 1" />
        <ToggleButton id="panel_1.panel_1_1" text="Open Panel 1.1 (Netsed)" />
        <ToggleButton id="panel_2" text="Open Panel 2" />
        <ToggleButton id="panel_3" text="Open Panel 3" />
        <ToggleButton id="panel_4" text="Open Panel 4" />
        <ToggleButton id="panel_5" text="Open Panel 5" />
      </div>
      <div>
        <NestedAccordionPanel
          id="panel_1"
          details={
            <div>
              <div>{text}</div>
              <br />
              <NestedAccordionPanel id="panel_1.panel_1_1" details={text} summary="Panel 1.1" />
            </div>
          }
          summary="Panel 1"
        />
        <NestedAccordionPanel id="panel_2" details={text} summary="Panel 2" />
        <NestedAccordionPanel id="panel_3" details={text} summary="Panel 3" />
        <NestedAccordionPanel id="panel_4" details={text} summary="Panel 4" />
        <NestedAccordionPanel id="panel_5" details={text} summary="Panel 5" />
      </div>
    </div>
  </NestedAccordionProvider>
)
