import '@blueprintjs/core/lib/css/blueprint.css'
import '../shared/style.css'

import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Nav from '../shared/Nav'

class DocsApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/static/index.css" />
          <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.1.2/dist/base.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.1.2/dist/components.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.1.2/dist/utilities.min.css" />
          <title>Some title</title>
        </Head>

        <Nav />

        <main>
          <Component {...pageProps} />
        </main>

        <style jsx>{`
          div {
            background-color: #f5f8fa;
            display: flex;
            flex-direction: row;
            margin: auto;
            max-width: 1100px;
            min-height: 100vh;
          }

          div > * {
            flex-grow: 0;
            flex-shrink: 0;
          }

          main {
            flex-basis: 830px;
            align-items: flex-start;
            outline: none;
            background-color: #f5f8fa;
            padding: 0 20px 40px 40px;
          }
        `}</style>
      </div>
    )
  }
}

export default DocsApp
