import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Accordion, AccordionProps } from './Accordion'

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
