const { nanoid } = require('nanoid');
const Books = require('./data/books');
const validate = require('./utility/validate');

// @desc    Get all Books
// @route   GET /books
// @code    200
const getBooks = (req, hapi) => {
  const { name, reading, finished } = req.query;

  let query = Books.filter();
  if (name) {
    query = query.filter((book) => book.name === name);
  }
  if (reading) {
    query = query.filter((book) => book.reading === reading);
  }
  if (finished) {
    query = query.filter((book) => book.finished === finished);
  }

  const res = hapi.response({
    status: 'success',
    data: {
      books: query,
    },
  });

  return res;
};

// @desc    Get single book
// @route   GET /books/{bookId}
// @code    200/404
const getBook = (req, hapi) => {
  const { bookId } = req.params;
  const book = Books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return hapi
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
  }

  return hapi
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

// @desc    Create book
// @route   POST /books
// @code    200/500
const createBook = (req, hapi) => {
  const check = validate(req.payload);

  if (!check.status) {
    return hapi.code(400).response(check);
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  Books.push(newBook);

  const isSuccess = Books.filter((b) => b.id === id).length > 0;

  if (!isSuccess) {
    return hapi.code(500).response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
  }

  return hapi.code(200).response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};

module.exports = { getBooks, getBook, createBook };
