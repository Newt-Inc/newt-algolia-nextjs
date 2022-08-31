import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchGenerators } from '../../lib/api'

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID + '',
  process.env.ALGOLIA_ADMIN_API_KEY + ''
)

const index = algolia.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME + '')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.end()

  // if (req.headers["authorization"] !== process.env.WEBHOOK_SECRET_KEY)
  //   return res.status(401).end();

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

    await index.saveObjects(formattedGenerators)

    res.send(201)
  } catch (err: any) {
    res.status(400).send(err?.message)
  }
}
