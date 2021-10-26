require('./pkg/db/index');

const express = require('express');
const handlerCars = require('./handlers/cars');
const handlerBook = require('./handlers/books');


const api = express();

api.use(express.json());

api.post('/cars', handlerCars.addCar);
api.get('/cars', handlerCars.getCars);
api.get('/cars/:id', handlerCars.getCar);
api.put('/cars/:id', handlerCars.updateCar);
api.patch('/cars/:id', handlerCars.partialUpdate);
api.delete('/cars/:id', handlerCars.deleteCar);

api.post('/books', handlerBook.addBook);
api.get('/books', handlerBook.getBooks);
api.get('/books/:id', handlerBook.getBook);
api.put('/books/:id', handlerBook.updateBook);
api.patch('/books/:id', handlerBook.partialUpdate);
api.delete('/books/:id', handlerBook.deleteBook);

api.listen(3005, err => {
  if (err) {
    return console.log(err);
  }
  console.log("Services started on port 3005");
});

