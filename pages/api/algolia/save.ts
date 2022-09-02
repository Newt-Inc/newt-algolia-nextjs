import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchGenerators } from '../../../lib/api'

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID + '',
  process.env.ALGOLIA_ADMIN_API_KEY + ''
)

const primaryIndex = algolia.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_PRIMARY_INDEX + ''
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.end()
  if (req.query.secret !== process.env.ALGOLIA_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const generators = await fetchGenerators({
      description: { fmt: 'text' },
    })
    const formattedGenerators = generators.map((generator) => {
      return {
        objectID: generator._id,
        ...generator,
      }
    })

    await primaryIndex.saveObjects(formattedGenerators)
    res.status(200).json({ message: 'success' })
  } catch (err: any) {
    res.status(400).json({ message: err?.message })
  }
}
