'use strict'

const Schema = use('Schema')

class BookTagSchema extends Schema {
  up () {
    this.create('book_tag', table => {
      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books')
        .onDelete('CASCADE')
      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('book_tag')
  }
}

module.exports = BookTagSchema
