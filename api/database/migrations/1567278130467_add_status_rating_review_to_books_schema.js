'use strict'

const Schema = use('Schema')

class AddStatusRatingReviewToBooksSchema extends Schema {
  up () {
    this.table('books', table => {
      table
        .text('review')
        .nullable()
        .after('description')
      table
        .integer('rating')
        .nullable()
        .after('cover')
      table
        .enu('status', [
          'READING',
          'WANT_READ',
          'READ',
          'REREADING',
          'ABANDONED'
        ])
        .after('rating')
        .nullable()
    })
  }

  down () {
    this.table('books', table => {
      table.dropColumn('rating')
      table.dropColumn('review')
      table.dropColumn('status')
    })
  }
}

module.exports = AddStatusRatingReviewToBooksSchema
