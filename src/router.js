const {
  handlerAddBooks,
  handlerGetAllBooks,
  handlerGetBooksById,
  handlerDeleteBookById,
  handlerUpdatedBookById
} = require('./handler');
const baseUrl = '/v1/books'

// Router
const router = [
  {
    // Create Books
    method: "POST",
    path: baseUrl,
    handler: handlerAddBooks
  },
  {
    // Get All Books
    method: "GET",
    path: baseUrl,
    handler: handlerGetAllBooks
  },
  {
    // Get Books by Id
    method: "GET",
    path: `${baseUrl}/{id}`,
    handler: handlerGetBooksById
  },
  {
    // Update Books by Id
    method: "PUT",
    path: `${baseUrl}/{id}`,
    handler: handlerUpdatedBookById
  },
  {
    // Delete Books by id
    method: "DELETE",
    path: `${baseUrl}/{id}`,
    handler: handlerDeleteBookById
  }
];

module.exports = router;
