'use strict'

const Drive = use('Drive')
const Helpers = use('Helpers')

class CoverController {
  async show ({ params, response }) {
    const { cover: coverFile } = params
    const cover = Helpers.tmpPath(`uploads/covers/${coverFile}`)
    const coverExists = await Drive.exists(cover)

    if (!coverExists) {
      return response.status(404).send({ error: 'Cover not found.' })
    }

    return response.download(cover)
  }
}

module.exports = CoverController
