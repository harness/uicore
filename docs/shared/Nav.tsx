import { Link } from '../static'
import NavDataset from './NavDataset'
import { useRouter } from 'next/router'

function NavSection({ name, items }) {
  const { route } = useRouter()
  const active = (url: string) => (route === url ? { active: 'true' } : {})

  return (
    <li>
      {name}
      <ul className="bp3-list-unstyled">
        {items.map(({ label, url }) => (
          <li key={url}>
            <Link {...active(url)} href={url}>
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

        li ul > li :global(a) {
          display: flex;
          padding: 4px 8px;
          border-radius: 5px;
          color: var(--grey-500);
        }

        li ul > li :global(a:hover) {
          text-decoration: none;
          font-weight: 600;
        }

        li ul > li :global(a[active='true']) {
          background: var(--green-200);
          font-weight: 600;
        }

        li ul > li :global(a:not([active='true']):hover) {
        }
      `}</style>
    </li>
  )
}

export default () => (
  <ul className="bp3-list-unstyled">
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
