import {Router} from 'express'
import {fetchCMS} from '../lib/cms'

export const adminRouter = Router()

// preview middleware consistent with content routes
adminRouter.use((req, _res, next) => {
  // Preview gating consistent with content routes. If PREVIEW_SECRET is set,
  // require the secret in the query or X-Preview-Secret header.
  const previewQuery = req.query && req.query.preview === 'true'
  const previewHeader = String(req.header('X-Preview') || '').toLowerCase() === 'true'

  const previewSecretEnv = process.env.PREVIEW_SECRET
  const querySecret = req.query && String((req.query as any).secret || '')
  const headerSecret = String(req.header('X-Preview-Secret') || '')

  const querySecretValid = !previewSecretEnv || querySecret === previewSecretEnv
  const headerSecretValid = !previewSecretEnv || headerSecret === previewSecretEnv

  ;(req as any).preview = (previewQuery && querySecretValid) || (previewHeader && headerSecretValid)
  next()
})

// GET /products -> returns CMSProduct[]
adminRouter.get('/products', async (req, res) => {
  const preview = (req as any).preview ?? false
  const query = `*[_type == "product"]{
    _id, name, "slug":slug.current, price, effects, productType->{title},
    "image": image{ "url": image.asset->url, "alt": image.alt }
  }`
  try {
    const items = await fetchCMS<any[]>(query, {}, {preview})
    const mapped = (items || []).map((p: any) => {
      const out: any = {
        __id: p._id,
        name: p.name,
        slug: p.slug,
        price: typeof p.price === 'number' ? p.price : Number(p.price || 0),
        type: p.productType?.title || (p.productType as any) || 'unknown',
      }
      if (p.effects && p.effects.length) out.effects = p.effects
      if (p.image && (p.image.url || p.image.alt)) out.image = {url: p.image.url, alt: p.image.alt}
      return out
    })
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=300')
    res.json(mapped)
  } catch (err) {
    console.error('Failed to fetch admin products', err)
    res.status(500).json({error: 'FAILED_TO_FETCH_PRODUCTS'})
  }
})

export default adminRouter
