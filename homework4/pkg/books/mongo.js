const mongoose = require('mongoose');

const Book = mongoose.model(
  'books',
  {
    name: String,
    author: String,
    genre: String,
    publisher: String,
    year: Number,
    language: String
  },
  'books'
);


const addBook = async (bookBody) => {
  let b = new Book(bookBody);
  return await b.save();
};

const getBooks = async () => {
  let data = await Book.find({});
  return data;
};

const getBook = async (id) => {
  let data = await Book.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return data;
};

const updateBook = async (id, bookBody) => {
  let data = await Book.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return await Book.updateOne({ _id: id }, bookBody);
};

const partialUpdate = async (id, bookBody) => {
  let data = await Book.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return await Book.updateOne({ _id: id }, bookBody);
};

const deleteBook = async (id) => {
  let data = await Book.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return await Book.deleteOne({ _id: id });
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  partialUpdate,
  deleteBook
};