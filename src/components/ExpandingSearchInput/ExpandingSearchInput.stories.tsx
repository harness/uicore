import React from 'react'
import type { Meta, Story } from '@storybook/react'

import {
  ExpandingSearchInputWithRef as ExpandingSearchInput,
  ExpandingSearchInputProps,
  ExpandingSearchInputHandle
} from './ExpandingSearchInput'

export default {
  title: 'Components/ExpandingSearchInput',
  component: ExpandingSearchInput
} as Meta

export const Basic: Story<ExpandingSearchInputProps> = args => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ExpandingSearchInput {...args} theme={'light'} />
      </div>
      <br />
      <br />
      <div style={{ display: 'flex' }}>
        <ExpandingSearchInput {...args} theme={'light'} showPrevNextButtons={true} />
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', background: '#000', padding: '32px' }}>
        <ExpandingSearchInput {...args} theme={'dark'} />
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', background: '#000', padding: '32px' }}>
        <ExpandingSearchInput {...args} theme={'dark'} showPrevNextButtons={true} />
      </div>
      <br />
      <br />
    </div>
  )
}

Basic.args = {}
