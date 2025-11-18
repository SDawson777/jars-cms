import {Router} from 'express'
import {fetchCMS} from '../../lib/cms'

export const filtersRouter = Router()

filtersRouter.get('/', async (req, res) => {
  // legacy queries (categories + filters)
  const catsQuery =
    '*[_type=="shopCategory" && active==true] | order(weight asc){name,"slug":slug.current,iconRef,weight}'
  const filtersQuery = `*[_type=="shopFilter"] | order(name asc){
    name, "slug":slug.current, type,
    "options":options[active==true] | order(weight asc){label,value}
  }`

  // If this is a legacy mount (/api/v1), return the legacy shape: { categories, filters }
  if (String(req.baseUrl || '').startsWith('/api/v1')) {
    const [categories, filters] = await Promise.all([
      fetchCMS(catsQuery, {}),
      fetchCMS(filtersQuery, {}),
    ])
    res.set('Cache-Control', 'public, max-age=43200, stale-while-revalidate=300')
    return res.json({categories, filters})
  }

  // Mobile shape: flatten filters to ShopFilter[] -> { id, label }
  const filters = await fetchCMS(filtersQuery, {})
  const mapped = (filters || []).map((f: any) => ({id: f.slug || f.name, label: f.name}))
  res.set('Cache-Control', 'public, max-age=43200, stale-while-revalidate=300')
  res.json(mapped)
})
