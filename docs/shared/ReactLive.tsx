import scope from '../static/index'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import theme from './theme'

export default ({ children }) => (
  <LiveProvider theme={theme} code={children} scope={{ ...scope }}>
    <div className="react-live-container">
      <LiveEditor className="editor" />
      <LivePreview className="preview" />
    </div>
    <div className="react-live-error">
      <LiveError className="error" />
    </div>
  </LiveProvider>
)
