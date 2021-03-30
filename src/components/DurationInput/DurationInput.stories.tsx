import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { DurationInput, DurationInputProps, timeToDisplayText, DurationInputHelpers } from './DurationInput'

export default {
  title: 'Components/DurationInput',
  component: DurationInput
} as Meta

export const Basic: Story<DurationInputProps> = args => <DurationInput {...args} />

Basic.args = {
  value: 93600000
}

export const Utils: Story = () => {
  const [time, setTime] = React.useState(9600000)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10)
    setTime(value)
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <code>time</code>: <input type="number" value={time} onChange={handleChange} />
      </div>
      <div>
        <code>timeToDisplayText(time)</code>: {timeToDisplayText(time)}
      </div>
      <div>
        <code>DurationInputHelpers.VALID_SYNTAX_REGEX.test(timeToDisplayText(time))</code>:{' '}
        {DurationInputHelpers.VALID_SYNTAX_REGEX.test(timeToDisplayText(time)) ? 'true' : 'false'}
      </div>
      <div></div>
      <div></div>
    </div>
  )
}
