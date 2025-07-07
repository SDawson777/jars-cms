export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'thc', title: 'THC %', type: 'string' },
    { name: 'cbd', title: 'CBD %', type: 'string' },
    { name: 'zipCode', title: 'ZIP Code', type: 'string' },
  ],
}
