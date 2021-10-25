const express = require('express');
const controller = require('./controller');

const api = express();

api.use(express.json());

api.post('/books', controller.addBook);
api.get('/books', controller.getBooks);
api.get('/books/:id', controller.getBook);
api.put('/books/:id', controller.updateBook);
api.patch('/books/:id', controller.partialUpdate);
api.delete('/books/:id', controller.deleteBook);


api.listen(3004, err => {
  if (err) {
    return console.log(err);
  }
  console.log("Services started on port 3004");
});



