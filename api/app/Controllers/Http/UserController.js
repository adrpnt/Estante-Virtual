'use strict'

const { validateAll } = use('Validator')

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const validation = await validateAll(data, {
      name: 'required',
      email: 'required|email|unique:users,email'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    const user = await User.create(data)

    return user
  }

  async update ({ auth, request }) {
    const { user } = auth
    const data = request.only(['name', 'email', 'password'])

    const validation = await validateAll(data, {
      name: 'required',
      email: 'required|email'
    })

    if (validation.fails()) {
      return validation.messages()
    }

    user.merge(data)
    await user.save()

    return user
  }
}

module.exports = UserController
