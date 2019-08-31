'use strict'

const Env = use('Env')
const Model = use('Model')

class Book extends Model {
  getCover (cover) {
    return `${Env.get('APP_URL')}/covers/${cover}`
  }

  tags () {
    return this.belongsToMany('App/Models/Tag')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Book
