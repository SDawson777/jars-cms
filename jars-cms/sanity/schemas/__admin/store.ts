import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'store',
  type: 'document',
  title: 'Store',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Name'}),
    defineField({name: 'location', type: 'geopoint', title: 'Location'}),
    defineField({name: 'address', type: 'string', title: 'Address'}),
    defineField({name: 'phone', type: 'string', title: 'Phone'}),
    defineField({name: 'hours', type: 'string', title: 'Hours'}),
  ],
  preview: {
    select: {title: 'name'},
  },
})
