import type { NextPage } from 'next'
import Head from 'next/head'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Hits,
  PoweredBy,
} from 'react-instantsearch-hooks-web'
import styles from '../styles/Home.module.css'
import { Hit } from '../components/Hit'
import { NoResultsBoundary, NoResults } from '../components/NoResults'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID + '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY + ''
)

const Home: NextPage = () => {
  return (
    <div className={styles.Wrapper}>
      <Head>
        <title>Newt + Algolia Example</title>
        <meta name="description" content="Newt + Algolia Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME + ''}
        searchClient={searchClient}
      >
        <header className={styles.Header}>
          <dl>
            <dt>Newt + Algolia Example</dt>
            <dd>
              <a
                href="https://github.com/Newt-Inc/newt-algolia-nextjs"
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub
              </a>
              <a href="#" rel="noreferrer noopener" target="_blank">
                Tutorial page
              </a>
            </dd>
          </dl>
          <h1>Static Site Generators 😉</h1>
          <div className="Search">
            <SearchBox />
            <span className="Search_FormIcon">
              <img src="/search.svg" alt="" width="19" height="19" />
            </span>
            <PoweredBy className="Search_Logo" />
          </div>
        </header>

        <div className={styles.Container}>
          <nav className={styles.Nav}>
            <h2>Sort</h2>
            <select>
              <option>Name</option>
              <option>GitHub Stars</option>
            </select>
            <h2>Filter</h2>
            <ul>
              <li>
                <label>
                  <input type="checkbox" />
                  JavaScript (2)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  PHP (3)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  React (12)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  Vue (1)
                </label>
              </li>
            </ul>
          </nav>

          <main className={styles.Main}>
            <NoResultsBoundary fallback={<NoResults />}>
              <Hits hitComponent={Hit} />
            </NoResultsBoundary>
          </main>
        </div>

        <footer className={styles.Footer}>
          <dl>
            <dt>Newt + Algolia Example</dt>
            <dd>
              <a
                href="https://github.com/Newt-Inc/newt-algolia-nextjs"
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub
              </a>
              <a href="#">Tutorial page</a>
            </dd>
          </dl>
        </footer>
      </InstantSearch>

      <a
        href="https://newt.so/"
        rel="noreferrer noopener"
        target="_blank"
        className={styles.Badge}
      >
        <img src="/logo.svg" alt="Newt" width="16" height="13" />
        <span className={styles.Badge_Text}>Made in Newt</span>
      </a>
    </div>
  )
}

export default Home
