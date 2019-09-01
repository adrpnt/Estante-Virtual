'use strict'

const Model = use('Model')

class Tag extends Model {
  books () {
    return this.belongsToMany('App/Models/Book')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Tag
