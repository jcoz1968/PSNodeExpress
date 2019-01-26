const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    console.log(book);
    return res.json(book);
  });
bookRouter.route('/books')
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    const response = { hello: 'This is my API' };
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
bookRouter.route('/books/:bookId')
  .get((req, res) => {
    const response = { hello: 'This is my API' };
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });  
app.use('/api', bookRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
