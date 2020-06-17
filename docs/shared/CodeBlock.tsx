import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import * as scope from '../static/index'
import * as Yup from 'yup'
import CodeTheme from './CodeTheme'
import { mdx } from '@mdx-js/react'
import { IconNames as BlueprintIconNames } from '@blueprintjs/icons'
import * as BP from '@blueprintjs/core'

export default ({ children, live, FCLive, render }) => {
  const liveProviderProps = {
    theme: CodeTheme,
    code: children.trim(),
    transformCode: (code: string) => '/** @jsx mdx */\n<>' + code + '\n</>',
    scope: { ...scope, BlueprintIconNames, mdx, Yup, BP }
  }

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
            fontFamily: 'var(--font-family)',
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
  } else if (FCLive) {
    return (
      <LiveProvider {...liveProviderProps} noInline={true} transformCode={code => '/** @jsx mdx */' + code}>
        <LivePreview
          style={{
            padding: '25px',
            border: '1px solid var(--grey-300)',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-family)',
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
