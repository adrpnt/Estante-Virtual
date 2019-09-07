'use strict'

const suite = use('Test/Suite')('Book')
const { test, trait } = suite

const Factory = use('Factory')

const Book = use('App/Models/Book')

trait('Auth/Client')
trait('DatabaseTransactions')
trait('Test/ApiClient')

trait(suite => {
  suite.Context.getter('user', () => ({
    id: 1,
    name: 'Test User',
    email: 'testuser@gmail.com'
  }))
})

suite.before(async () => {
  await Factory.model('App/Models/User').create({
    name: 'Test User',
    email: 'testuser@gmail.com',
    password: '123456'
  })

  await Book.create({
    title: 'O Hobbit',
    author: 'J. R. R. Tolkien',
    user_id: 1
  })
})

test('get a list of all books', async ({ client, user }) => {
  const response = await client
    .get('/books')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([
    {
      title: 'O Hobbit',
      author: 'J. R. R. Tolkien'
    }
  ])
})

test('create a book', async ({ assert, client, user }) => {
  const data = { title: 'O Silmarillion', author: 'J. R. R. Tolkien' }
  const response = await client
    .post('/books')
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  const books = await Book.all()

  response.assertStatus(200)
  response.assertJSONSubset(data)

  assert.equal(books.toJSON().length, 2)
})

test('get a specific book', async ({ client, user }) => {
  const book = await Book.find(1)
  const response = await client
    .get(`/books/${book.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(book.toJSON())
})

test('update a book', async ({ client, user }) => {
  const book = await Book.find(1)
  const data = { number_pages: '297' }
  const response = await client
    .put(`/books/${book.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(data)
})

test('delete a book', async ({ client, user }) => {
  const book = await Book.find(1)
  const response = await client
    .delete(`/books/${book.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSON({
    message: 'Book deleted.'
  })
})
