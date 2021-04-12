const validate = (act, req) => {
  const {
    name,
    pageCount,
    readPage,
  } = req;

  const res = {
    status: 'success',
  };

  if (!name) {
    res.status = 'fail';
    res.message = `Gagal ${
      act === 'create' ? 'menambahkan' : 'memperbarui'
    } buku. Mohon isi nama buku`;
  }

  if (readPage > pageCount) {
    res.status = 'fail';
    res.message = `Gagal ${
      act === 'create' ? 'menambahkan' : 'memperbarui'
    } buku. readPage tidak boleh lebih besar dari pageCount`;
  }

  return res;
};

module.exports = validate;
