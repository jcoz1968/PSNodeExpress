const express = require('express');
const mongoose = require('mongoose');

const app = express();
if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
