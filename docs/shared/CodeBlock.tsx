import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import scope from '../static/index'
import theme from './theme'
import { mdx } from '@mdx-js/react'

export default ({ children, className, live, render }) => {
  const language = className.replace(/language-/, '')
  const liveProviderProps = {
    theme,
    code: children.trim(),
    transformCode: (code: string) => '/** @jsx mdx */' + code,
    scope: { ...scope, mdx }
  }

  if (live) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveEditor className="editor" />
        <LivePreview
          style={{
            padding: '25px',
            border: '1px solid var(--grey-300)',
            display: 'flex',
            // @ts-ignore
            'align-items': 'center',
            'justify-content': 'center'
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
        <pre className={className} style={{ ...style, padding: '20px' }}>
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
