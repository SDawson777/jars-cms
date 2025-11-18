import {Router} from 'express'
import {fetchCMS} from '../../lib/cms'

export const faqsRouter = Router()

async function fetchAndFlattenFaqs(req: any, res: any) {
  const preview = req.preview ?? false
  const query =
    '*[_type=="faqGroup"] | order(weight asc){title,slug, "items":items(){"q":question,"a":answer}}'
  // fetch groups from CMS
  const groups = await fetchCMS(query, {}, {preview})

  // If this request is under the legacy mount (/api/v1/content), return the original groups shape
  if (String(req.baseUrl || '').startsWith('/api/v1')) {
    res.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=300')
    return res.json(groups)
  }

  // Otherwise (mobile path), flatten into [{id,question,answer}]
  const flattened: Array<{id: string; question: string; answer: string}> = []
  ;(groups || []).forEach((g: any, gi: number) => {
    const baseId = (typeof g.slug === 'string' && g.slug) || g.title || `group-${gi}`
    ;(g.items || []).forEach((it: any, ii: number) => {
      flattened.push({
        id: `${baseId}-${ii}`,
        question: it.q || it.question || '',
        answer: it.a || it.answer || '',
      })
    })
  })
  res.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=300')
  res.json(flattened)
}

// primary endpoints and aliases for mobile
faqsRouter.get('/', (req, res) => fetchAndFlattenFaqs(req as any, res))
faqsRouter.get('/fa_q', (req, res) => fetchAndFlattenFaqs(req as any, res))
faqsRouter.get('/faq', (req, res) => fetchAndFlattenFaqs(req as any, res))
