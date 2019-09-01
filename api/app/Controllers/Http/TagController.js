'use strict'

const { validateAll } = use('Validator')

const Tag = use('App/Models/Tag')

class TagController {
  async index ({ auth }) {
    const tags = await auth.user.tags().fetch()

    return tags
  }

  async store ({ auth, request }) {
    const { id } = auth.user
    const data = request.only(['name'])

    const validation = await validateAll(data, {
      name: 'required'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    data.user_id = id

    const tag = await Tag.create(data)

    return tag
  }

  async show ({ auth, params, response }) {
    const tag = await Tag.findOrFail(params.id)

    if (tag.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized' })
    }

    return tag
  }

  async update ({ auth, params, request, response }) {
    const tag = await Tag.findOrFail(params.id)
    const data = request.only(['name'])

    const validation = await validateAll(data, {
      name: 'required'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    if (tag.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized.' })
    }

    tag.merge(data)
    await tag.save()

    return tag
  }

  async destroy ({ auth, params, response }) {
    const tag = await Tag.findOrFail(params.id)

    if (tag.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized.' })
    }

    await tag.delete()

    return response.send({ message: 'Tag deleted.' })
  }
}

module.exports = TagController
