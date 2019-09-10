import { Link } from '../static'
import NavDataset from './NavDataset'

function NavSection({ name, items }) {
  return (
    <li>
      {name}
      <ul className="entry bp3-list bp3-list-unstyled">
        {items.map(({ label, url }) => (
          <li key={url}>
            <Link href={url}>{label}</Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .entry {
          margin-bottom: 30px;
          margin-top: 10px;
          color: var(--grey-500);
        }

        .entry > li {
          text-transform: none;
        }
      `}</style>
    </li>
  )
}

export default () => (
  <ul className="section bp3-list bp3-list-unstyled">
    {NavDataset.map(({ name, items }) => (
      <NavSection key={name} name={name} items={items} />
    ))}
    <style jsx>{`
      .section {
        margin: 30px 15px 15px 30px;
      }

      .section > li {
        text-transform: uppercase;
        font-weight: 500;
        color: var(--grey-450);
      }
    `}</style>
  </ul>
)
