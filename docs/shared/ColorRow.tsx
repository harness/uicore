import React from 'react'
import { Popover, Utils, Text } from '../static'

const ColorRow = ({ name, value }) => {
  const style = { verticalAlign: 'middle' }
  return (
    <tr>
      <td style={style}>{name}</td>
      <td>
        <Popover
          content={<Text padding="small">var({name}) (click to copy)</Text>}
          usePortal={false}
          interactionKind="hover">
          <button
            style={{
              all: 'unset',
              background: `var(${name})`,
              width: '30px',
              height: '30px',
              display: 'inline-block',
              border: `1px solid ${name.includes('white') ? '#000' : '#fff'}`,
              cursor: 'pointer'
            }}
            onClick={() => Utils.copy('var(' + name + ')')}
          />
        </Popover>
      </td>
      <td style={style}>{value}</td>
      <td style={style}>{name.replace(/-/g, '')}</td>
      <td style={style}>
        Color.
        {name
          .replace(/--/g, '')
          .replace(/-/g, '_')
          .toUpperCase()}
      </td>
    </tr>
  )
}

export default ColorRow
