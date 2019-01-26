const express = require('express');
const Book = require('../models/bookModel');

function routes() {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();
      return res.status(201).json(book);
    });
  bookRouter.route('/books')
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      const response = {
        hello: 'This is my API'
      };
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      const response = {
        hello: 'This is my API'
      };
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });
  return bookRouter;
}

module.exports = routes;