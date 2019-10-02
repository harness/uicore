import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import * as scope from '../static/index'
import CodeTheme from './CodeTheme'
import { mdx } from '@mdx-js/react'

export default ({ children, live, render }) => {
  const liveProviderProps = {
    theme: CodeTheme,
    code: children.trim(),
    transformCode: (code: string) => '/** @jsx mdx */\n<>' + code + '\n</>',
    scope: { ...scope, mdx }
  }

  console.log({ children, live, render })

  if (live) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LivePreview
          style={{
            padding: '25px',
            border: '1px solid var(--grey-300)',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px 5px 0 0'
          }}
        />
        <LiveError className="error" />
        <LiveEditor
          style={{
            borderRadius: '0 0 5px 5px'
          }}
        />
      </LiveProvider>
    )
  }

  if (render) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LivePreview
          style={{
            border: '1px solid var(--grey-300)',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px'
          }}
        />
      </LiveProvider>
    )
  }

  return (
    <LiveProvider {...liveProviderProps}>
      <LiveEditor
        style={{
          borderRadius: '5px',
          margin: 0
        }}
        disabled={true}
      />
    </LiveProvider>
  )
}
