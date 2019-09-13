import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import * as scope from '../static/index'
import CodeTheme from './CodeTheme'
import { mdx } from '@mdx-js/react'

export default ({ children, className, live, render }) => {
  const language = (className || 'js').replace(/language-/, '')
  const liveProviderProps = {
    theme: CodeTheme,
    code: children.trim(),
    transformCode: (code: string) => '/** @jsx mdx */' + code,
    scope: { ...scope, mdx }
  }

  if (live) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveEditor
          style={{
            borderRadius: '5px 5px 0 0'
          }}
        />
        <LivePreview
          style={{
            padding: '25px',
            border: '1px solid var(--grey-300)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 0 5px 5px'
          }}
        />
        <LiveError className="error" />
      </LiveProvider>
    )
  }

  if (render) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LivePreview />
      </LiveProvider>
    )
  }

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', borderRadius: '5px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
