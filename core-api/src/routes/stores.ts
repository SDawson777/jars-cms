import {Router} from 'express'
import {z} from 'zod'
import {prisma} from '../lib/prisma'

export const stores = Router()

stores.get('/', async (req, res) => {
  const p = z
    .object({
      lat: z.coerce.number().optional(),
      lng: z.coerce.number().optional(),
      radius: z.coerce.number().min(1).max(300).default(50),
      limit: z.coerce.number().min(1).max(100).default(20),
    })
    .parse(req.query)

  const where: any = {isActive: true}
  if (p.lat != null && p.lng != null) {
    const dLat = p.radius / 111
    const dLng = p.radius / (111 * Math.cos((p.lat * Math.PI) / 180))
    where.latitude = {gte: p.lat - dLat, lte: p.lat + dLat}
    where.longitude = {gte: p.lng - dLng, lte: p.lng + dLng}
  }

  const items = await prisma.store.findMany({
    where,
    take: p.limit,
    orderBy: [{city: 'asc'}, {name: 'asc'}],
    select: {
      id: true,
      name: true,
      slug: true,
      address1: true,
      city: true,
      state: true,
      postalCode: true,
      latitude: true,
      longitude: true,
      phone: true,
      hours: true,
      isActive: true,
    },
  })
  res.json({items})
})

stores.get('/:id', async (req, res) => {
  const p = z.object({id: z.string()}).parse(req.params)
  const store = await prisma.store.findUnique({where: {id: p.id}})
  if (!store) return res.status(404).json({error: 'NOT_FOUND'})
  res.json(store)
})
