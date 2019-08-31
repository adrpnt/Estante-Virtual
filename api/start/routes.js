'use strict'

const Route = use('Route')

// GUESS ROUTES
Route.post('/sessions', 'SessionController.store').middleware('guest')
Route.post('/users', 'UserController.store').middleware('guest')
Route.get('/covers/:cover', 'CoverController.show')

// AUTH ROUTES
Route.group(() => {
  Route.put('/users/:id', 'UserController.update')

  Route.resource('books', 'BookController').apiOnly()
}).middleware(['auth'])
