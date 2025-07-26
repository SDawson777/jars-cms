import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Article Category',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Category Name', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'icon', title: 'Icon Image', type: 'image', options: {hotspot: true}})
  ]
})