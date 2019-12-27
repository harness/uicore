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
