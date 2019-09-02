'use strict'

const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('author').nullable()
      table.integer('number_pages').nullable()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
