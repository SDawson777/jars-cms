import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quiz',
  title: 'Article Quiz',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Quiz Title', type: 'string'}),
    defineField({name: 'linkedArticle', title: 'Linked Article', type: 'reference', to: [{type: 'article'}]}),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'question',
          fields: [
            {name: 'prompt', type: 'string', title: 'Question'},
            {name: 'choices', type: 'array', of: [{type: 'string'}]},
            {name: 'correctAnswer', type: 'string', title: 'Correct Answer'}
          ]
        }
      ]
    })
  ]
})