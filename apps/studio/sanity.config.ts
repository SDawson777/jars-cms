import {defineConfig} from 'sanity'
import {PREVIEW_TOKEN_ENV} from './config/preview'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'staging'

export default defineConfig({
  name: 'jars-studio',
  title: 'JARS CMS',
  projectId,
  dataset,
  // plugins remain configured in the studio codebase
  plugins: [],
  // surface preview token to local dev if set
  __experimental_actions: process.env[PREVIEW_TOKEN_ENV]
    ? ['create', 'update', 'publish']
    : ['create', 'update'],
})
