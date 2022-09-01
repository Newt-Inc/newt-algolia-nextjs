import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-hooks-web'
import styles from '../styles/Home.module.css'
import { Hit } from '../components/Hit'

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
              Back to tutorial page
            </a>
          </dd>
        </dl>
        <h1>Static Site Generators 😉</h1>
        <InstantSearch
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME + ''}
          searchClient={searchClient}
        >
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
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
          Next.js https://www.newt.so/ Production grade React applications that
          scale. The world’s leading companies use Next.js by Vercel to build
          static and dynamic websites and web applications. JavaScript React
          2344
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
            <a href="#">Back to tutorial page</a>
          </dd>
        </dl>
      </footer>

      <a
        href="https://newt.so/"
        rel="noreferrer noopener"
        target="_blank"
        className={styles.Badge}
      >
        <Image src="/logo.svg" alt="Newt" width={16} height={13} />
        <span className={styles.Badge_Text}>Made in Newt</span>
      </a>
    </div>
  )
}

export default Home
