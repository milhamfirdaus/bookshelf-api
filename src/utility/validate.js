const validate = (req) => {
  const { name, year, pageCount, readPage } = req;

  const res = {
    status: 'success',
  };

  if (!name) {
    res.status = 'fail';
    res.message = 'Gagal menambahkan buku. Mohon isi nama buku';
  }

  if (!year.length <= 4 || typeof year !== 'number') {
    res.status = 'fail';
    res.message = 'Gagal menambahkan buku. Mohon isi tahun buku dengan benar';
  }

  if (readPage > pageCount) {
    res.status = 'fail';
    res.message =
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
  }

  return res;
};

module.exports = validate;
