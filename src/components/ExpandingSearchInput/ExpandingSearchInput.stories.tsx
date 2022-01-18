/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
  const ref = React.useRef<ExpandingSearchInputHandle>()

  return (
    <div>
      <ExpandingSearchInput {...args} ref={ref} />
      <br />
      <br />
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref.current?.clear()}>Clear</button>
    </div>
  )
}

Basic.args = {}
