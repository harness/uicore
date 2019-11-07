import React from 'react'

import { DurationInput, TextInput, Layout } from '../static/index'

export default function DurationInputExample() {
  const [state, setState] = React.useState(93600000)

  return (
    <Layout.Horizontal spacing="medium" id="duration-input-example">
      <DurationInput label="Input duration" value={state} onChange={setState} />
      <TextInput label="Parsed value" value={state.toString()} disabled />
    </Layout.Horizontal>
  )
}
