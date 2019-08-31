'use strict'

const { validateAll } = use('Validator')

const Helpers = use('Helpers')
const Book = use('App/Models/Book')

class BookController {
  async index ({ auth }) {
    const books = await auth.user.books().fetch()

    return books
  }

  async store ({ auth, request }) {
    const { id } = auth.user
    const data = request.all()

    const validation = await validateAll(data, {
      title: 'required'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    const cover = await this._processCoverUpload(request)
    const book = await Book.create({
      ...data,
      cover,
      user_id: id
    })

    return book
  }

  async show ({ auth, params, response }) {
    const book = await Book.findOrFail(params.id)

    if (book.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized' })
    }

    return book
  }

  async update ({ auth, params, request, response }) {
    const book = await Book.findOrFail(params.id)
    const data = request.all()

    if (book.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized.' })
    }

    const cover = (await this._processCoverUpload(request)) || book.cover

    book.merge({ ...data, cover })
    await book.save()

    return book
  }

  async destroy ({ auth, params, response }) {
    const book = await Book.findOrFail(params.id)

    if (book.user_id !== auth.user.id) {
      return response.unauthorized({ error: 'Not authorized.' })
    }

    await book.delete()

    return response.send({ message: 'Book deleted.' })
  }

  async _processCoverUpload (request) {
    if (!request.file('cover') || !request.file('cover').size > 0) {
      return null
    }

    const cover = request.file('cover', {
      types: ['image'],
      size: '2mb'
    })

    await cover.move(Helpers.tmpPath('uploads/covers'), {
      name: `${new Date().getTime()}.${cover.subtype}`
    })

    if (!cover.moved()) {
      return cover.error()
    }

    return cover.fileName
  }
}

module.exports = BookController
