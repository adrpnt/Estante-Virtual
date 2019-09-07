'use strict'

const { validateAll } = use('Validator')

const Drive = use('Drive')
const Helpers = use('Helpers')
const Book = use('App/Models/Book')

class BookController {
  async index ({ auth }) {
    const books = await auth.user
      .books()
      .with('cover')
      .with('tags')
      .fetch()

    return books
  }

  async store ({ auth, request }) {
    const { id } = auth.user
    const tags = request.input('tags')
    const data = request.except(['tags'])

    const validation = await validateAll(data, {
      title: 'required'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    const book = await Book.create({
      ...data,
      user_id: id
    })

    if (tags && tags.length > 0) {
      await book.tags().sync(tags)
      await book.load('tags')
    }

    return book
  }

  async show ({ auth, params, response }) {
    const book = await Book.findOrFail(params.id)

    if (book.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized' })
    }

    await book.loadMany(['cover', 'tags'])

    return book
  }

  async update ({ auth, params, request, response }) {
    const book = await Book.findOrFail(params.id)
    const tags = request.input('tags')
    const data = request.except(['tags'])

    if (book.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized.' })
    }

    book.merge(data)
    await book.save()

    if (tags && tags.length > 0) {
      await book.tags().sync(tags)
      await book.load('tags')
    }

    return book
  }

  async destroy ({ auth, params, response }) {
    const book = await Book.findOrFail(params.id)
    const cover = await book.cover().fetch()

    if (book.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized.' })
    }

    if (cover) {
      await Drive.delete(Helpers.tmpPath(`uploads/covers/${cover.file}`))
    }

    await book.delete()

    return response.send({ message: 'Book deleted.' })
  }
}

module.exports = BookController
