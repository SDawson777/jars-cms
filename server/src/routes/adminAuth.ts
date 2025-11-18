import {Router} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import {loadAdmins, findAdmin} from '../lib/admins'

const router = Router()
const COOKIE_NAME = 'admin_token'

router.use(cookieParser())

// Basic rate limiter for admin login to mitigate brute-force in-memory.
// For production, replace with Redis-backed store (connect-redis) and per-IP/user throttling.
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 8, // limit each IP to 8 login requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})

// POST /admin/login
// body: {brand?: string, dispensary?: string, email, password}
router.post('/login', loginLimiter, async (req: any, res) => {
  const {brand, dispensary, email, password} = req.body || {}
  const jwtSecret = process.env.JWT_SECRET || 'dev-secret'

  if (!email || !password) return res.status(400).json({error: 'MISSING_CREDENTIALS'})

  const cfg = loadAdmins()
  if (cfg) {
    // use JSON config to find brand/disp/admin
    const found = findAdmin(brand, dispensary, email)
    if (!found || !found.admin) return res.status(401).json({error: 'INVALID_CREDENTIALS'})
    const admin = found.admin
    let valid = false
    if (admin.passwordHash) {
      valid = await bcrypt.compare(password, admin.passwordHash)
    } else {
      // no hash provided in config; not recommended
      valid = false
    }
    if (!valid) return res.status(401).json({error: 'INVALID_CREDENTIALS'})
    const token = jwt.sign(
      {email, brand: found.brand.id, dispensary: found.dispensary.id},
      jwtSecret,
      {
        expiresIn: '4h',
      },
    )
    res.cookie(COOKIE_NAME, token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})
    return res.json({ok: true})
  }

  // fallback to env-based single-admin mode
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
  if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
    return res.status(500).json({error: 'ADMIN_NOT_CONFIGURED'})
  }
  if (email !== adminEmail) return res.status(401).json({error: 'INVALID_CREDENTIALS'})
  let valid = false
  if (adminPasswordHash) {
    valid = await bcrypt.compare(password, adminPasswordHash)
  } else {
    valid = password === adminPassword
  }
  if (!valid) return res.status(401).json({error: 'INVALID_CREDENTIALS'})
  const token = jwt.sign({email}, jwtSecret, {expiresIn: '4h'})
  res.cookie(COOKIE_NAME, token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})
  res.json({ok: true})
})

// GET /admin/logout
router.get('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME)
  // Prefer a redirect when called from a browser link; keep JSON for XHR callers
  if (_req.headers.accept && _req.headers.accept.indexOf('text/html') !== -1) {
    return res.redirect('/admin')
  }
  res.json({ok: true})
})

export default router
