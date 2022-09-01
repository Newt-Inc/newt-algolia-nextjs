import { Highlight } from 'react-instantsearch-hooks-web'

export const Hit = ({ hit }: any) => {
  console.log('hit', hit)

  return (
    <>
      <div className="ais-Hits-item_Logo">
        <img src={hit.logo.src} alt={hit.fileName} width="40" height="40" />
      </div>
      <div className="ais-Hits-item_Data">
        <div className="ais-Hits-item_Header">
          <h2 className="ais-Hits-item_Name">
            <a href={hit.url} rel="noreferrer noopener" target="_blank">
              <Highlight attribute="title" hit={hit} />
            </a>
          </h2>
          <p className="ais-Hits-item_URL">{hit.url}</p>
        </div>
        <p className="ais-Hits-item_Description">
          <Highlight attribute="description" hit={hit} />
        </p>
        <div className="ais-Hits-item_Footer">
          <div className="ais-Hits-item_Tags">
            <span>{hit.language}</span>
            {hit.templates.map((template: any) => {
              return <span key={template}>{template}</span>
            })}
          </div>
          <div className="ais-Hits-item_Star">
            <img src="/star.svg" alt="" width="16" height="15" />
            <span>{hit.star}</span>
          </div>
        </div>
      </div>
    </>
  )
}
