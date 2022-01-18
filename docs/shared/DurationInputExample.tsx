/*
 * Copyright 2019 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'

import { DurationInput, TextInput, Layout, Label } from '../static/index'

export default function DurationInputExample() {
  const [state, setState] = React.useState(93600000)

  return (
    <Layout.Horizontal spacing="medium" id="duration-input-example">
      <Layout.Vertical spacing="small">
        <Label>Input duration</Label>
        <DurationInput value={state} onChange={setState} />
      </Layout.Vertical>
      <Layout.Vertical spacing="small">
        <Label>Parsed value</Label>
        <TextInput value={state.toString()} disabled />
      </Layout.Vertical>
    </Layout.Horizontal>
  )
}
