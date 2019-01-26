const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
