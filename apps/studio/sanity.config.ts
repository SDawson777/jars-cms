import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {PREVIEW_TOKEN_ENV} from './config/preview'
import schemaTypes from './schemaTypes'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'ygbu28p2'

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'staging'

export default defineConfig({
  name: 'jars-studio',
  title: 'JARS CMS',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  // surface preview token to local dev if set
  __experimental_actions: process.env[PREVIEW_TOKEN_ENV]
    ? ['create', 'update', 'publish']
    : ['create', 'update'],
})
