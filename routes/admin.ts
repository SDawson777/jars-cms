import express from 'express'
import {client} from '../sanity/sanityClient'

const router = express.Router()

router.get('/admin/products', async (_req, res) => {
  try {
    const data = await client.fetch(`*[_type == "product" && available == true]{
      _id,
      name,
      slug,
      price,
      image,
      effects,
      "type": type->title
    }`)
    res.json(data)
  } catch (e) {
    res.status(500).json({error: 'Failed to fetch products'})
  }
})

router.get('/admin/drops', async (_req, res) => {
  try {
    const data = await client.fetch(`*[_type == "drop"]{
      _id, title, dropDate, highlight,
      "products": products[]->{
        name, slug, price, image
      }
    }`)
    res.json(data)
  } catch (e) {
    res.status(500).json({error: 'Failed to fetch drops'})
  }
})

router.get('/admin/banners', async (_req, res) => {
  try {
    const data = await client.fetch(`*[_type == "banner" && active == true]{
      _id, title, image, ctaText, ctaLink
    }`)
    res.json(data)
  } catch (e) {
    res.status(500).json({error: 'Failed to fetch banners'})
  }
})

export default router