import { Link } from '../static'

export default () => (
  <>
    <ul className="section bp3-list bp3-list-unstyled">
      <li>
        GETTING STARTED
        <ul className="entry bp3-list bp3-list-unstyled">
          <li>
            <Link href="/installation">Installation</Link>
          </li>
          <li>
            <Link href="/release-notes">Release Notes</Link>
          </li>
        </ul>
      </li>

      <li>
        Core Concepts
        <ul className="entry bp3-list bp3-list-unstyled">
          <li>No or Less Styling</li>
          <li>
            <Link href="/colors">Colors</Link>
          </li>
          <li>Intents</li>
          <li>Spacing</li>
          <li>Component Layouts</li>
          <li>Blueprint Based Styling</li>
        </ul>
      </li>

      <li>
        Layout
        <ul className="entry bp3-list bp3-list-unstyled">
          <li>Container</li>
          <li>Flex</li>
        </ul>
      </li>

      <li>
        Components
        <ul className="entry bp3-list bp3-list-unstyled">
          <li>
            <Link href="/heading">Heading</Link>
          </li>
          <li>
            <Link href="/button">Button</Link>
          </li>
          <li>Button Group</li>
          <li>Icons</li>
        </ul>
      </li>
    </ul>
    <style jsx>{`
      .section {
        margin: 30px 15px 15px 30px;
      }

      .section > li {
        text-transform: uppercase;
        font-weight: 500;
        color: var(--grey-450);
      }

      .entry {
        margin-bottom: 30px;
        margin-top: 10px;
        color: var(--grey-500);
      }

      .entry > li {
        text-transform: none;
      }
    `}</style>
  </>
)
