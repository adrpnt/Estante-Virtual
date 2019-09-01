'use strict'

const Schema = use('Schema')

class CoverSchema extends Schema {
  up () {
    this.create('covers', table => {
      table.increments()
      table.string('file').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('covers')
  }
}

module.exports = CoverSchema
