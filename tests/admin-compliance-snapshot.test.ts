import {describe, it, expect, beforeEach, vi} from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import {withAdminCookies} from './helpers'

var fetchCMSMock: any
const createMockClient = () => ({
  create: vi.fn().mockResolvedValue(true),
  createOrReplace: vi.fn().mockResolvedValue(true),
})

vi.mock('../server/src/lib/cms', () => {
  fetchCMSMock = vi.fn()
  return {fetchCMS: fetchCMSMock, createWriteClient: () => createMockClient()}
})

import app from '../server/src'

function appRequest() {
  return request(app) as any
}

beforeEach(() => {
  fetchCMSMock.mockReset()
  process.env.JWT_SECRET = 'dev-secret'
})

describe('POST /api/admin/compliance/snapshot RBAC and history', () => {
  it('allows ORG_ADMIN to run snapshot for their org', async () => {
    // computeCompliance will call fetchCMS; stub to harmless values
    fetchCMSMock.mockResolvedValue([])
    const token = jwt.sign(
      {id: 'u1', email: 'orgadmin@example.com', role: 'ORG_ADMIN', organizationSlug: 'org1'},
      process.env.JWT_SECRET,
    )
    const authed = withAdminCookies(appRequest(), token)
    const res = await authed.post('/api/admin/compliance/snapshot')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(res.body).toHaveProperty('id')
    // ensure history id includes org1
    expect(String(res.body.id)).toContain('org1')
  })

  it('prevents BRAND_ADMIN from snapshotting other brands', async () => {
    fetchCMSMock.mockResolvedValue([])
    const token = jwt.sign(
      {id: 'b1', email: 'brandadmin@example.com', role: 'BRAND_ADMIN', brandSlug: 'brandA'},
      process.env.JWT_SECRET,
    )
    const authed = withAdminCookies(appRequest(), token)
    const res = await authed.post('/api/admin/compliance/snapshot').send({brand: 'brandB'})
    expect(res.status).toBe(403)
  })

  it('allows OWNER to specify org and brand', async () => {
    fetchCMSMock.mockResolvedValue([])
    const token = jwt.sign(
      {id: 'o1', email: 'owner@example.com', role: 'OWNER'},
      process.env.JWT_SECRET,
    )
    const authed = withAdminCookies(appRequest(), token)
    const res = await authed
      .post('/api/admin/compliance/snapshot')
      .send({org: 'orgX', brand: 'brandX'})
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(String(res.body.id)).toContain('orgX')
    expect(String(res.body.id)).toContain('brand-brandX')
  })

  it('returns history rows for admin scope', async () => {
    const sample = [
      {
        _id: 'complianceSnapshot-org1-2025-01-01T00:00:00.000Z',
        orgSlug: 'org1',
        brandSlug: undefined,
        ts: '2025-01-01T00:00:00.000Z',
        runBy: 'x',
      },
      {
        _id: 'complianceSnapshot-org1-brand-brandA-2025-01-02T00:00:00.000Z',
        orgSlug: 'org1',
        brandSlug: 'brandA',
        ts: '2025-01-02T00:00:00.000Z',
        runBy: 'y',
      },
    ]
    fetchCMSMock.mockResolvedValue(sample)
    process.env.SANITY_STUDIO_URL = 'https://studio.example.com'
    const token = jwt.sign(
      {id: 'u1', email: 'orgadmin@example.com', role: 'ORG_ADMIN', organizationSlug: 'org1'},
      process.env.JWT_SECRET,
    )
    const res = await appRequest()
      .get('/api/admin/compliance/history')
      .set('Cookie', `admin_token=${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(2)
    expect(res.body[0]).toHaveProperty('studioUrl')
  })
})
