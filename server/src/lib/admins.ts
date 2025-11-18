import fs from 'fs'
import path from 'path'

type AdminEntry = {email: string; passwordHash?: string}
type Dispensary = {id: string; name?: string; admins: AdminEntry[]}
type Brand = {id: string; name?: string; dispensaries: Dispensary[]}

export type AdminsConfig = {brands: Brand[]}

let cached: AdminsConfig | null = null

export function loadAdmins(): AdminsConfig | null {
  if (cached) return cached
  const file = path.join(__dirname, '..', 'data', 'admins.json')
  if (!fs.existsSync(file)) return null
  try {
    const raw = fs.readFileSync(file, 'utf8')
    const parsed = JSON.parse(raw) as AdminsConfig
    cached = parsed
    return parsed
  } catch {
    // ignore parse errors and return null
    return null
  }
}

export function findAdmin(brandId?: string, dispensaryId?: string, email?: string) {
  const cfg = loadAdmins()
  if (!cfg) return null
  const brand = brandId
    ? cfg.brands.find((b) => b.id === brandId || b.name === brandId)
    : cfg.brands[0]
  if (!brand) return null
  const disp = dispensaryId
    ? brand.dispensaries.find((d) => d.id === dispensaryId || d.name === dispensaryId)
    : brand.dispensaries[0]
  if (!disp) return null
  const admin = email ? disp.admins.find((a) => a.email === email) : disp.admins[0]
  return {brand, dispensary: disp, admin}
}
