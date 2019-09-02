'use strict'

const Route = use('Route')

Route.post('/sessions', 'SessionController.store').middleware('guest')
Route.post('/users', 'UserController.store').middleware('guest')
Route.get('/covers/:file', 'CoverController.show')

// AUTH ROUTES
Route.group(() => {
  Route.put('/users/:id', 'UserController.update')

  Route.post('/covers', 'CoverController.store').middleware('cover_upload')
  Route.put('/covers/:id', 'CoverController.update').middleware('cover_upload')

  Route.resource('books', 'BookController').apiOnly()
  Route.resource('tags', 'TagController').apiOnly()
}).middleware(['auth'])
