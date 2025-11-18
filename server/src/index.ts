import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import adminAuthRouter from './routes/adminAuth'
import {requireAdmin} from './middleware/adminAuth'

import {contentRouter} from './routes/content'
import {statusRouter} from './routes/status'
import {adminRouter} from './routes/admin'

const app = express()
// Security middlewares
app.use(helmet())
// Ensure JSON + URL-encoded parsers and CORS defaults
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configure CORS: if CORS_ORIGINS env is set (comma-separated), restrict origins
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173']
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, server-to-server)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true)
      return callback(new Error('CORS origin denied'))
    },
  }),
)

// Parse cookies (used by admin auth)
app.use(cookieParser())
// Serve a small static landing page for human visitors / buyers
const staticDir = path.join(__dirname, '..', 'static')
app.use(express.static(staticDir))
app.get('/', (_req, res) => res.sendFile(path.join(staticDir, 'index.html')))

// Admin auth routes (login/logout)
app.use('/admin', adminAuthRouter)
// Serve admin static pages (login and dashboard)
app.get('/admin', (_req, res) => res.sendFile(path.join(staticDir, 'admin', 'login.html')))
app.get('/admin/dashboard', requireAdmin, (_req, res) =>
  res.sendFile(path.join(staticDir, 'admin', 'dashboard.html')),
)
app.get('/admin/settings', requireAdmin, (_req, res) =>
  res.sendFile(path.join(staticDir, 'admin', 'settings.html')),
)

// content routes (existing + new)
// Mount content routes for legacy API consumers
app.use('/api/v1/content', contentRouter)
// Mount content routes for mobile and external consumers (mobile contract)
app.use('/content', contentRouter)

// status routes (legacy and a simple /status alias)
app.use('/api/v1/status', statusRouter)
app.use('/status', statusRouter)
// admin routes (products used by mobile)
app.use('/api/admin', adminRouter)

export default app
