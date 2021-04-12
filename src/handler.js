/* eslint-disable eqeqeq */
const { nanoid } = require('nanoid');
const Books = require('./data/books');
const validate = require('./utility/validate');

// @ket     Get all books
// @route   GET /books
const getBooks = (req, hapi) => {
  const { name, reading, finished } = req.query;

  let query = Books;

  if (name) {
    query = query.filter((book) => book.name.includes(name));
  }
  if (reading) {
    query = query.filter((book) => book.reading == reading);
  }
  if (finished) {
    query = query.filter((book) => book.finished == finished);
  }

  const res = hapi.response({
    status: 'success',
    data: {
      books: query,
    },
  });

  return res;
};

// @ket     Get single book
// @route   GET /books/{bookId}
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

// @ket     Create book
// @route   POST /books
const createBook = (req, hapi) => {
  const resValidate = validate('create', req.payload);
  if (resValidate.status !== 'success') {
    return hapi.response(resValidate).code(400);
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
    return hapi
      .response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      })
      .code(500);
  }

  return hapi
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
    .code(201);
};

// @ket     Update book
// @route   PUT /books/{bookId}
const updateBook = (req, hapi) => {
  const resValidate = validate('update', req.payload);
  if (resValidate.status !== 'success') {
    return hapi.response(resValidate).code(400);
  }

  const { bookId } = req.params;
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
  const updatedAt = new Date().toISOString();

  const i = Books.findIndex((book) => book.id === bookId);

  if (i !== -1) {
    Books[i] = {
      ...Books[i],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return hapi
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  }

  return hapi.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
};

// @ket     Delete book
// @route   DELETE /books/{bookId}
const deleteBook = (req, hapi) => {
  const { bookId } = req.params;

  const i = Books.findIndex((book) => book.id === bookId);

  if (i !== -1) {
    Books.splice([i], 1);

    return hapi
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
  }

  return hapi
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus, Id buku tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
