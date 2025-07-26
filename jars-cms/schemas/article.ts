import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Educational Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: Rule => Rule.required()}),
    defineField({name: 'excerpt', title: 'Short Excerpt', type: 'text', rows: 3}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}, {type: 'image'}]}),
    defineField({name: 'mainImage', title: 'Thumbnail Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'publishedAt', title: 'Published Date', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}]}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'published', title: 'Published?', type: 'boolean', initialValue: true})
  ]
})