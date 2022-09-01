import { Highlight } from 'react-instantsearch-hooks-web'

export function Hit({ hit }: any): JSX.Element {
  return (
    <div>
      <img src={hit.logo.src} alt={hit.fileName} width="60" height="60" />
      <div>
        <Highlight attribute="title" hit={hit} />
      </div>
      <a href={hit.url} rel="noreferrer noopener" target="_blank">
        {hit.url}
      </a>
      <div>
        <Highlight attribute="description" hit={hit} />
      </div>
      <div>
        <Highlight attribute="language" hit={hit} />
      </div>
      <div>
        <Highlight attribute="templates" hit={hit} />
      </div>
      <div>{hit.star}</div>
    </div>
  )
}
