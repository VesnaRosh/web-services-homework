const mongoose = require('mongoose');

const Car = mongoose.model(
  'cars',
  {
    name: String,
    manufacturer: String,
    year: Number,
    class: String,
    engine: String,
    gear: String
  },
  'cars'
);


const addCar = async (carBody) => {
  let c = new Car(carBody);
  return await c.save();
};

const getCars = async () => {
  let data = await Car.find({});
  return data;
};

const getCar = async (id) => {
  let data = await Car.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return data;
};

const updateCar = async (id, carBody) => {
  let data = await Car.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return await Car.updateOne({ _id: id }, carBody);
};

const partialUpdate = async (id, carBody) => {
  let data = await Car.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return await Car.updateOne({ _id: id }, carBody);
};

const deleteCar = async (id) => {
  let data = await Car.find({ _id: id });
  if (data.length == 0) {
    return false;
  }
  return await Car.deleteOne({ _id: id });
};

module.exports = {
  addCar,
  getCars,
  getCar,
  updateCar,
  partialUpdate,
  deleteCar
};