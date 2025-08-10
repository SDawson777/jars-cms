 import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {schemaTypes} from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'JARS CMS',

  projectId: 'ygbu28p2',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

