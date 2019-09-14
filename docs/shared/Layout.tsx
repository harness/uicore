import React from 'react'
import { Icons, Link, Text, Heading } from '../static'
import Nav from './Nav'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from './CodeBlock'

const mdxComponents = {
  code: CodeBlock,

  a: props => <Link {...props} />,
  h1: props => <Heading level="1" {...props} />,
  h2: props => <Heading level="2" {...props} />,
  h3: props => <Heading level="3" {...props} />,
  h4: props => <Heading level="4" {...props} />,
  h5: props => <Heading level="5" {...props} />,
  h6: props => <Heading level="6" {...props} />,
  p: props => <Text {...props} inline={false} />,
  span: props => <Text {...props} />
}

export default class Layout extends React.Component {
  render() {
    return (
      <div className="page-container">
        <header>
          <h1>
            <a href="/">
              <Icons.HarnessLogo2 height="24" />
              <span>&nbsp;// UI Docs</span>
            </a>
          </h1>
        </header>

        <nav>
          <Nav />
        </nav>

        <MDXProvider components={mdxComponents}>
          <main>{this.props.children}</main>
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
            border-bottom: 1px solid var(--secondary-200);
            display: flex;
            padding-left: 10px;
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
            padding: 20px;
          }
        `}</style>
      </div>
    )
  }
}
