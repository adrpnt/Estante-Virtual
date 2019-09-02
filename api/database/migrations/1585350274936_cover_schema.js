'use strict'

const Schema = use('Schema')

class CoverSchema extends Schema {
  up () {
    this.create('covers', table => {
      table.increments()
      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books')
        .nullable()
        .onDelete('CASCADE')
      table.string('file').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('covers')
  }
}

module.exports = CoverSchema
