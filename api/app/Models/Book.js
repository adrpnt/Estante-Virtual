'use strict'

const Model = use('Model')

class Book extends Model {
  cover () {
    return this.hasOne('App/Models/Cover')
  }

  tags () {
    return this.belongsToMany('App/Models/Tag')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Book
