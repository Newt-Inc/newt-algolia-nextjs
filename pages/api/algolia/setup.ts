import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID + '',
  process.env.ALGOLIA_ADMIN_API_KEY + ''
)

const primaryIndex = algolia.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_PRIMARY_INDEX + ''
)
const replicaIndexStar = algolia.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_REPLICA_INDEX_STAR + ''
)
const replicaIndexName = algolia.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_REPLICA_INDEX_TITLE + ''
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method not allowed` })
  }
  if (req.query.secret !== process.env.ALGOLIA_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    await primaryIndex.setSettings({
      searchableAttributes: ['title', 'tags', 'description'],
      customRanking: ['desc(star)'],
      attributesForFaceting: ['tags'],
      replicas: [
        process.env.NEXT_PUBLIC_ALGOLIA_REPLICA_INDEX_STAR + '',
        process.env.NEXT_PUBLIC_ALGOLIA_REPLICA_INDEX_TITLE + '',
      ],
    })

    await replicaIndexStar.setSettings({
      searchableAttributes: ['title', 'tags', 'description'],
      customRanking: ['desc(star)'],
      attributesForFaceting: ['tags'],
      ranking: [
        'custom',
        'typo',
        'geo',
        'words',
        'filters',
        'proximity',
        'attribute',
        'exact',
      ],
    })
    await replicaIndexName.setSettings({
      searchableAttributes: ['title', 'tags', 'description'],
      customRanking: ['asc(title)'],
      attributesForFaceting: ['tags'],
      ranking: [
        'custom',
        'typo',
        'geo',
        'words',
        'filters',
        'proximity',
        'attribute',
        'exact',
      ],
    })
    res.status(200).json({ message: 'success' })
  } catch (err: any) {
    res.status(400).json({ message: err?.message })
  }
}
