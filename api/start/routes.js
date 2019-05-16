'use strict'

const Route = use('Route')

Route.post('/sessions', 'SessionController.store').middleware('guest')
Route.post('/users', 'UserController.store').middleware('guest')

Route.group(() => {
  Route.put('/users/:id', 'UserController.update')

  Route.resource('books', 'BookController').apiOnly()
}).middleware(['auth'])
