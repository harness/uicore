import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { ExpressionInput, ExpressionInputProps } from './ExpressionInput'

export default {
  title: 'Components / ExpressionInput',
  component: ExpressionInput
} as Meta

export const Basic: Story<ExpressionInputProps> = args => {
  return <ExpressionInput {...args} />
}

Basic.args = {
  items: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.stage.qa.displayNameeqrfddsfweyudfrtyhsdfqsqwdxwdcwtrcfqwtdwcrwqhjdwvcqwhyjevcjwhtevcwqthercjhwvqerhwqtevrcwqhtevqwhtcevqwjhtrv qdwhjhydfuqjywfdrjhasyqfd'
  ],
  value: 'asdasdf <+app.name> asfas <+pipeline.stage.qa.displayName>'
}
