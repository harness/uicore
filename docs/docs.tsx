import React from 'react'
import ReactDOM from 'react-dom'

// import '@blueprintjs/core/lib/css/blueprint.css'
// import '../dist/index.css'
import { Button, Icons } from '../dist/index'

function Sample() {
  return (
    <div>
      <Button id="sample-button" text="Platform Button" icon={Icons.Calendar} />
    </div>
  )
}

ReactDOM.render(<Sample />, document.getElementById('root'))
