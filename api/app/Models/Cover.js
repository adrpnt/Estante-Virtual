'use strict'

const Env = use('Env')
const Model = use('Model')

class Cover extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ file }) {
    return `${Env.get('APP_URL')}/covers/${file}`
  }

  books () {
    return this.belongsTo('App/Models/Book')
  }
}

module.exports = Cover
