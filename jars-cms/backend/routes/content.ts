import express from 'express'
import {getClient} from '../sanityClient'

const router = express.Router()

function setCaching(res: express.Response) {
  if (process.env.NODE_ENV === 'production') {
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30')
  }
}

function usePreview(req: express.Request) {
  return (
    req.query.preview === 'true' &&
    req.headers.authorization === `Bearer ${process.env.SANITY_PREVIEW_TOKEN}`
  )
}

router.get('/faq', async (req, res) => {
  try {
    const client = getClient(usePreview(req))
    const data = await client.fetch('*[_type == "faq"]')
    setCaching(res)
    res.json(data)
  } catch {
    res.status(500).json({error: 'Failed to fetch FAQ'})
  }
})

router.get('/legal', async (req, res) => {
  try {
    const client = getClient(usePreview(req))
    const data = await client.fetch('*[_type == "legal"]')
    setCaching(res)
    res.json(data)
  } catch {
    res.status(500).json({error: 'Failed to fetch legal policies'})
  }
})

router.get('/articles', async (req, res) => {
  try {
    const client = getClient(usePreview(req))
    const data = await client.fetch('*[_type == "article"] | order(publishedAt desc)')
    setCaching(res)
    res.json(data)
  } catch {
    res.status(500).json({error: 'Failed to fetch articles'})
  }
})

export default router
