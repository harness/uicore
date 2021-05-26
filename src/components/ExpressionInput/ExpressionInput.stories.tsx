import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { ExpressionInput, ExpressionInputProps } from './ExpressionInput'

export default {
  title: 'Components / ExpressionInput',
  component: ExpressionInput
} as Meta

export const Basic: Story<ExpressionInputProps> = args => {
  return (
    <div style={{ width: '600px' }}>
      <ExpressionInput {...args} />
    </div>
  )
}

Basic.args = {
  items: [
    'app.name',
    'app.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.var1',
    'pipeline.var2',
    'pipeline.var3',
    'pipeline.var4',
    'pipeline.var5',
    'pipeline.var6',
    'pipeline.var7',
    'pipeline.var8',
    'pipeline.var9',
    'pipeline.var10',
    'pipeline.var11',
    'pipeline.var12',
    'pipeline.var13',
    'pipeline.var14',
    'pipeline.var15',
    'pipeline.var16',
    'pipeline.var17',
    'pipeline.var18',
    'pipeline.var19',
    'pipeline.var20',
    'pipeline.stage.qa.displayNameeqrfddsfweyudfrtyhsdfqsqwdxwdcwtrcfqwtdwcrwqhjdwvcqwhyjevcjwhtevcwqthercjhwvqerhwqtevrcwqhtevqwhtcevqwjhtrv qdwhjhydfuqjywfdrjhasyqfd'
  ],
  value: 'asdasdf <+app.name> asfas <+pipeline.stage.qa.displayName>'
}
