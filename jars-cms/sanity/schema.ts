import {defineConfig} from 'sanity'
import article from './schemas/article'
import category from './schemas/category'
import quiz from './schemas/quiz'

export default defineConfig({
  name: 'default',
  title: 'Jars CMS',
  projectId: 'ygbu28p2', 
  dataset: 'production',
  schema: {
    types: [article, category, quiz]
  }
})