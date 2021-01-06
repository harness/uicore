import React from 'react'
import { HarnessIcons, Layout, Config } from '../static'
import Nav from './Nav'
import { MDXProvider } from '@mdx-js/react'
import MdxComponents from './MdxComponents'
import { FocusStyleManager } from '@blueprintjs/core'

FocusStyleManager.onlyShowFocusOnTabs()
Config.DISABLE_LINK_REWRITE = true

export default class extends React.Component {
  render() {
    const HarnessLogo: React.ElementType = HarnessIcons['harness-logo-black']

    return (
      <div className="page-container">
        <header>
          <h1>
            <a href="/">
              <HarnessLogo height={20} />
              <span>&nbsp;// UICore</span>
            </a>
          </h1>
        </header>

        <nav>
          <Nav />
        </nav>

        <MDXProvider components={MdxComponents}>
          <main>
            <Layout.Vertical id="main-layout" spacing="medium">
              {this.props.children}
            </Layout.Vertical>
          </main>
        </MDXProvider>

        <style jsx>{`
          .page-container {
            --header-height: 64px;
            --nav-width: 300px;
          }

          header {
            position: sticky;
            height: var(--header-height);
            width: 100%;
            top: 0;
            background-color: var(--white);
            border-bottom: 1px solid var(--grey-200);
            display: flex;
            padding-left: 10px;
            z-index: 1;
          }

          header h1 {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0;
          }

          header h1 a {
            display: flex;
            align-items: center;
            white-space: nowrap;
          }

          header h1 a:hover {
            text-decoration: none;
          }

          header h1 a span {
            color: var(--grey-400);
            font-weight: 400;
            font-size: 22px;
          }

          nav {
            position: fixed;
            width: var(--nav-width);
            top: 64px;
            left: 0;
            bottom: 0;
            overflow: auto;
          }

          main {
            margin-left: var(--nav-width);
            padding: 20px 20px 100px 20px;
          }

          main :global(pre) {
            margin-top: 0;
          }

          main > :global(h1),
          main > :global(h2),
          main > :global(h3),
          main > :global(h4),
          main > :global(h5),
          main > :global(h6) {
            margin: 30px 0 15px 0;
          }
        `}</style>
      </div>
    )
  }
}
