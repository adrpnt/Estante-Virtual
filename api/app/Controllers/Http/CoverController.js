'use strict'

const Drive = use('Drive')
const Helpers = use('Helpers')
const Cover = use('App/Models/Cover')

class CoverController {
  async store ({ request }) {
    const { cover: fileName, bookId } = request.post()
    const cover = await Cover.create({ book_id: bookId, file: fileName })

    return cover
  }

  async show ({ params, response }) {
    const cover = await Cover.findByOrFail('file', params.file)
    const coverPath = Helpers.tmpPath(`uploads/covers/${cover.file}`)
    const coverExists = await Drive.exists(coverPath)

    if (!coverExists) {
      return response.status(404).send({ error: 'Cover file not found.' })
    }

    return response.download(coverPath)
  }

  async update ({ params, request }) {
    const cover = await Cover.findOrFail(params.id)
    const coverPath = Helpers.tmpPath(`uploads/covers/${cover.file}`)
    const coverExists = await Drive.exists(coverPath)
    const { cover: fileName } = request.post()

    if (coverExists) {
      await Drive.delete(coverPath)
    }

    cover.merge({ file: fileName })

    await cover.save()

    return cover
  }
}

module.exports = CoverController
