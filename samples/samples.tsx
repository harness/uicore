import React from 'react'
import ReactDOM from 'react-dom'

import { Button, Icons } from '../src/index'

function Sample() {
  return (
    <div>
      <Button id="sample-button" text="Platform Button" icon={Icons.Calendar} />
    </div>
  )
}

ReactDOM.render(<Sample />, document.getElementById('root'))
