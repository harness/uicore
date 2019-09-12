import { Link } from '../static'
import NavDataset from './NavDataset'
import { useRouter } from 'next/router'

console.log({ useRouter })

function NavSection({ name, items }) {
  const active = url => ('window.location.pathname' === url ? { active: true } : {})
  return (
    <li>
      {name}
      <ul className="bp3-list bp3-list-unstyled">
        {items.map(({ label, url }) => (
          <li key={url}>
            <Link href={url} {...active(url)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        li {
          text-transform: uppercase;
          font-weight: 500;
          color: var(--grey-450);
        }

        li ul {
          margin-bottom: 30px;
          margin-top: 10px;
          color: var(--grey-500);
        }

        li ul > li {
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
      ul {
        margin: 30px 15px 15px 30px;
      }
    `}</style>
  </ul>
)
