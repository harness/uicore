/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
