import Link from 'next/link'
import { Highlight } from 'react-instantsearch-hooks-web'

export function Hit({ hit }: any): JSX.Element {
  return (
    <div>
      <Link href={hit.url}>
        <a href="#">
          <div>
            <Highlight attribute="title" hit={hit} />
          </div>
        </a>
      </Link>
    </div>
  )
}
