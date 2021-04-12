const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
