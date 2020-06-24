import { Link } from '../static'
import NavDataset from './NavDataset'
import { useRouter } from 'next/router'

function NavSection({ name, items }) {
  const { route } = useRouter()
  const active = (url: string) => (route === url ? { active: true } : {})

  return (
    <li>
      <span className="name">{name}</span>
      <ul className="bp3-list-unstyled">
        {items
          .sort((a, b) => (a.label < b.label ? -1 : 1))
          .map(({ label, url, items }) => {
            if (items) {
              return (
                <details key={`${label}-${name}-details`} open>
                  <summary>{label}</summary>
                  <ul>
                    {items
                      .sort((a, b) => (a.label < b.label ? -1 : 1))
                      .map(({ label, url }) => (
                        <li key={url}>
                          <Link color="grey500" fill {...active(url)} href={url}>
                            {label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </details>
              )
            } else {
              return (
                <li key={url}>
                  <Link color="grey500" fill {...active(url)} href={url}>
                    {label}
                  </Link>
                </li>
              )
            }
          })}
      </ul>
      <style jsx>{`
        li {
          text-transform: uppercase;
          font-weight: 500;
          color: var(--grey-450);
        }

        .name {
          position: sticky;
          top: 0;
          display: block;
          padding: 10px 0;
          background-color: var(--white);
        }

        li ul {
          margin-bottom: 30px;
          color: var(--grey-500);
        }

        li ul > li {
          text-transform: none;
        }

        li ul > li :global(a) {
          display: flex !important;
          padding: 4px 8px !important;
          border-radius: 5px !important;
          color: var(--grey-500) !important;
          justify-content: left !important;
        }

        li ul > li :global(a:hover) {
          text-decoration: none !important;
          font-weight: 600 !important;
        }

        li ul > li :global(a[class*='active']) {
          background: var(--green-200) !important;
          font-weight: 600 !important;
        }
        details ul {
          margin-bottom: 0;
        }
        summary {
          text-transform: initial;
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
