import '@blueprintjs/core/lib/css/blueprint.css'
import '../shared/style.css'

import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Nav from '../shared/Nav'
import Layout from '../shared/Layout'

export default class DocsApp extends App {
  render() {
    const {
      Component,
      pageProps,
      router: { route }
    } = this.props
    const title = route.replace(/\W/g, '')

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>UI Platform - {title.charAt(0).toUpperCase() + title.slice(1)}</title>
          <link rel="stylesheet" href="/static/index.css" />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}
