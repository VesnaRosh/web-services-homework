const fs = require('./file_system');
const bf = 'books.json';

const addBook = async (req) => {
  let booksData = await fs.read(bf);
  let id = 1;
  if (booksData.length !== 0) {
    id = booksData[booksData.length - 1].id + 1;
  };
  let book = {
    id,
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
    publisher: req.body.publisher,
    year: req.body.year,
    language: req.body.language
  };
  booksData = [...booksData, book]
  await fs.write(bf, booksData);
  return book;
};

const getBooks = async () => {
  let booksData = await fs.read(bf);
  return booksData;
};

const getBook = async (req) => {
  let booksData = await fs.read(bf);
  let book = booksData.filter(book => book.id === Number(req.params.id));
  if (book.length === 0) {
    return false;
  }
  return book[0];
};

const updateBook = async (req) => {
  let booksData = await fs.read(bf);
  let postoiId = false;

  booksData.forEach(book => {
    if (book.id == req.params.id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  booksData = booksData.map(b => {
    if (b.id === Number(req.params.id)) {
      b.name = req.body.name;
      b.author = req.body.author;
      b.genre = req.body.genre;
      b.publisher = req.body.publisher;
      b.year = req.body.year;
      b.language = req.body.language;
    }
    return b;
  });
  await fs.write(bf, booksData);
};

const partialUpdate = async (req) => {
  let booksData = await fs.read(bf);
  let postoiId = false;

  booksData.forEach(book => {
    if (book.id == req.params.id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  booksData = booksData.map(b => {
    if (b.id === Number(req.params.id)) {
      b.name = req.body.name ? req.body.name : b.name;
      b.author = req.body.author ? req.body.author : b.author;
      b.genre = req.body.genre ? req.body.genre : b.genre;
      b.publisher = req.body.publisher ? req.body.publisher : b.publisher;
      b.year = req.body.year ? req.body.year : b.year;;
      b.language = req.body.language ? req.body.language : b.language;
    }
    return b;
  });
  await fs.write(bf, booksData);
};

const deleteBook = async (req) => {
  let booksData = await fs.read(bf);
  let prevLength = booksData.length;
  booksData = booksData.filter(b => b.id !== Number(req.params.id));
  if (booksData.length === prevLength) {
    return false;
  }
  await fs.write(bf, booksData);
}

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  partialUpdate,
  deleteBook
}