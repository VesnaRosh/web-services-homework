const fs = require('../fs');
const bf = '../../books.json';

const addBook = async (bookBody) => {
  let booksData = await fs.read(bf);
  let id = 1;
  if (booksData.length !== 0) {
    id = booksData[booksData.length - 1].id + 1;
  };
  let book = {
    id,
    name: bookBody.name,
    author: bookBody.author,
    genre: bookBody.genre,
    publisher: bookBody.publisher,
    year: bookBody.year,
    language: bookBody.language
  };
  booksData = [...booksData, book]
  await fs.write(bf, booksData);
  return book;
};

const getBooks = async () => {
  let booksData = await fs.read(bf);
  return booksData;
};

const getBook = async (id) => {
  let booksData = await fs.read(bf);
  let book = booksData.filter(book => book.id === Number(id));
  if (book.length === 0) {
    return false;
  }
  return book[0];
};

const updateBook = async (id, bookBody) => {
  let booksData = await fs.read(bf);
  let postoiId = false;

  booksData.forEach(book => {
    if (book.id == id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  booksData = booksData.map(b => {
    if (b.id === Number(id)) {
      b.name = bookBody.name;
      b.author = bookBody.author;
      b.genre = bookBody.genre;
      b.publisher = bookBody.publisher;
      b.year = bookBody.year;
      b.language = bookBody.language;
    }
    return b;
  });
  await fs.write(bf, booksData);
};

const partialUpdate = async (id, bookBody) => {
  let booksData = await fs.read(bf);
  let postoiId = false;

  booksData.forEach(book => {
    if (book.id == id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  booksData = booksData.map(b => {
    if (b.id === Number(id)) {
      b.name = bookBody.name ? bookBody.name : b.name;
      b.author = bookBody.author ? bookBody.author : b.author;
      b.genre = bookBody.genre ? bookBody.genre : b.genre;
      b.publisher = bookBody.publisher ? bookBody.publisher : b.publisher;
      b.year = bookBody.year ? bookBody.year : b.year;;
      b.language = bookBody.language ? bookBody.language : b.language;
    }
    return b;
  });
  await fs.write(bf, booksData);
};

const deleteBook = async (id) => {
  let booksData = await fs.read(bf);
  let prevLength = booksData.length;
  booksData = booksData.filter(b => b.id !== Number(id));
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
};