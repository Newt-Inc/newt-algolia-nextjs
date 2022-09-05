import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'
import { getGenerators } from '../../../lib/api'

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID + '',
  process.env.ALGOLIA_ADMIN_API_KEY + ''
)

const index = algolia.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_PRIMARY_INDEX + ''
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method not allowed` })
  }
  if (req.query.secret !== process.env.ALGOLIA_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const generators = await getGenerators()
    const formattedGenerators = generators.map((generator) => {
      return {
        objectID: generator._id,
        ...generator,
      }
    })

    const { objectIDs } = await index.saveObjects(formattedGenerators)
    res.status(200).json({ objectIDs })
  } catch (err: any) {
    res.status(400).json({ message: err?.message })
  }
}
