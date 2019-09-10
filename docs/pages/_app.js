import '@blueprintjs/core/lib/css/blueprint.css'
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Layout from '../shared/Layout'

export default class UIDocsApp extends App {
  render() {
    const {
      Component,
      pageProps,
      router: { route }
    } = this.props
    const title = route
      .replace(/\//, '')
      .replace('-', ' ')
      .replace(/^[a-z]/, $1 => $1.toUpperCase())
      .replace(/\s[a-z]/, $1 => $1.toUpperCase())

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>UI Platform - {title || 'Documentation'}</title>
          <link rel="stylesheet" href="/static/index.css" />
          <style jsx global>{`
            html,
            body,
            body > div {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
          `}</style>
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}
