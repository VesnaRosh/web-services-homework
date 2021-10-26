const books = require('../pkg/books/mongo');


const addBook = async (req, res) => {
  try {
    let condition = !req.body.name
      || !req.body.author
      || !req.body.genre
      || !req.body.publisher
      || !req.body.year
      || !req.body.language;
    if (condition) {
      return res.status(400).send('Bad request');
    }
    let book = await books.addBook(req.body);
    res.status(201).send(book);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  };
};

const getBooks = async (req, res) => {
  try {
    let booksData = await books.getBooks();
    res.status(200).send(booksData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const getBook = async (req, res) => {
  try {
    let book = await books.getBook(req.params.id);
    if (book === false) {
      res.status(404).send('Not found');
    }
    else {
      res.status(200).send(book);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const updateBook = async (req, res) => {
  try {
    let condition = !req.body.name || !req.body.author || !req.body.genre || !req.body.publisher || !req.body.year || !req.body.language;
    if (condition) {
      return res.status(400).send('Bad request');
    }
    let book = await books.updateBook(req.params.id, req.body);
    if (book === false) {
      return res.status(404).send('Not found');
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const partialUpdate = async (req, res) => {
  try {
    let condition = req.body.name || req.body.author || req.body.genre || req.body.publisher || req.body.year || req.body.language;
    if (!condition) {
      return res.status(400).send('Bad request');
    }
    let book = await books.partialUpdate(req.params.id, req.body);
    if (book === false) {
      return res.status(404).send('Not found');
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const deleteBook = async (req, res) => {
  try {
    let book = await books.deleteBook(req.params.id);
    if (book === false) {
      return res.status(404).send('Not found');
    }
    res.status(204).send();
  } catch (err) {
    comsole.log(err);
    res.status(500).send(err);
  };
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  partialUpdate,
  deleteBook
};