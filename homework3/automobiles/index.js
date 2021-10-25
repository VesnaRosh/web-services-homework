const express = require('express');
const controller = require('./controller');

const api = express();

api.use(express.json());

api.post('/cars', controller.addCar);
api.get('/cars', controller.getCars);
api.get('/cars/:id', controller.getCar);
api.put('/cars/:id', controller.updateCar);
api.patch('/cars/:id', controller.partialUpdate);
api.delete('/cars/:id', controller.deleteCar);

api.listen(3005, err => {
  if (err) {
    return console.log(err);
  }
  console.log("Services started on port 3005");
});

