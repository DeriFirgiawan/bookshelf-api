const books = require('./books');
const { nanoid } = require('nanoid');

const handlerAddBooks = (request, h) => {
  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    fineshed: false,
    reading,
    insertedAt: createAt,
    updatedAt: createAt
  }

  books.push(newBooks);

  const isSuccess = books.filter(book => book.id === id).length > 0;
  if (name === "") {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    });

    response.code(400);
    return response;
  } else if (readPage >= pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });

    response.code(400);
    return response;
  } else if(isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      }
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Buku gagal ditambahkan"
    });
  
    response.code(500);
    return response;
  }
}

const handlerGetAllBooks = (request, h) => {
  const dataResponse = books.map(result => {
    const {
      id,
      name,
      publisher
    } = result;
    return { id, name, publisher }
  })
  const response = h.response({
    status: "success",
    data: {
      books: dataResponse
    }
  });

  response.code(200);
  return response;
}

const handlerGetBooksById = (request, h) => {
  const { id } = request.params;

  const filterBook = books.filter(book => book.id === id)[0];
  if (filterBook !== undefined) {
    return {
      status: "success",
      data: {
        book: filterBook
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });

  response.code(404);
  return response;
}

const handlerUpdatedBookById = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const updatedAt = new Date().toISOString();
  const filterId = books.findIndex((book) => book.id === id);
  const filterBook = books.filter(book => book.id === id)[0];
  if (filterBook !== undefined) {
    if (name === "") {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku"
      });
  
      response.code(400);
      return response;
    } else if (readPage >= pageCount) {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      });
  
      response.code(400);
      return response;
    } else if(filterId !== -1) {
      books[filterId] = {
        ...books[filterId],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
      };
      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(201);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Buku gagal diperbarui"
      });
    
      response.code(500);
      return response;
    }
  } 
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal diperbarui'
  });

  response.code(404);
  return response;
}

const handlerDeleteBookById = (request, h) => {
  const { id } = request.params;
  const filterId = books.findIndex((book) => book.id === id);

  if (filterId !== -1) {
    books.splice(filterId, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil di hapus"
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus'
  });

  response.code(404);
  return response;
}

module.exports = {
  handlerGetAllBooks,
  handlerDeleteBookById,
  handlerAddBooks,
  handlerGetBooksById,
  handlerUpdatedBookById
}
