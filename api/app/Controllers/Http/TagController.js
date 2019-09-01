'use strict'

const { validateAll } = use('Validator')

const Tag = use('App/Models/Tag')

class TagController {
  async index ({ response }) {
    const tags = await Tag.all()

    return tags
  }

  async store ({ request, response }) {
    const data = request.only(['name'])

    const validation = await validateAll(data, {
      name: 'required'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    const tag = await Tag.create(data)

    return tag
  }

  async show ({ params, response }) {
    const tag = await Tag.findOrFail(params.id)

    return tag
  }

  async update ({ params, request, response }) {
    const tag = await Tag.findOrFail(params.id)
    const data = request.only(['name'])

    const validation = await validateAll(data, {
      name: 'required'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    tag.merge(data)
    await tag.save()

    return tag
  }

  async delete ({ params, response }) {
    const tag = await Tag.findOrFail(params.id)

    await tag.delete()

    return response.send({ message: 'Tag deleted.' })
  }
}

module.exports = TagController
