'use strict'

const Helpers = use('Helpers')

class ProcessCoverUpload {
  async handle ({ request, response }, next) {
    if (!request.file('cover') || !request.file('cover').size > 0) {
      return response.status(404).json({ error: 'No cover to process.' })
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

    request.body.cover = cover.fileName

    await next()
  }
}

module.exports = ProcessCoverUpload
