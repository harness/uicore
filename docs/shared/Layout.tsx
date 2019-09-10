import React from 'react'
import { Icons, Link } from '../static'
import Nav from './Nav'

export default class Layout extends React.Component {
  render() {
    return (
      <div className="page-container">
        <header>
          <h1>
            <a href="/">
              <Icons.HarnessLogo2 height="32" />
              <span>&nbsp;// UI Docs</span>
            </a>
          </h1>
        </header>

        <nav>
          <Nav />
        </nav>

        <main>{this.props.children}</main>

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
          }

          header h1 a:hover {
            text-decoration: none;
          }

          header h1 a span {
            color: var(--grey-400);
            font-weight: 300;
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
