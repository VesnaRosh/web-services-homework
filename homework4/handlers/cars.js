const model = require('../pkg/cars/mongo');
const validate = require('../pkg/cars/validator');


const addCar = async (req, res) => {
  try {
    await validate(req.body);
  } catch (err) {
    console.log(err)
    return res.status(400).send(err);
  }
  try {
    let car = await model.addCar(req.body);
    res.status(201).send(car);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  };
};

const getCars = async (req, res) => {
  try {
    let carsData = await model.getCars();
    res.status(200).send(carsData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const getCar = async (req, res) => {
  try {
    let car = await model.getCar(req.params.id);
    if (car === false) {
      res.status(404).send('Not found');
    }
    else {
      res.status(200).send(car);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const updateCar = async (req, res) => {
  try {
    await validate(req.body);
  } catch (err) {
    console.log(err)
    return res.status(400).send(err);
  }
  try {
    let car = await model.updateCar(req.params.id, req.body);
    if (car === false) {
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
    await validate(req.body, 'UPDATE');
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
  try {
    let car = await model.partialUpdate(req.params.id, req.body);
    if (car === false) {
      return res.status(404).send('Not found');
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

const deleteCar = async (req, res) => {
  try {
    let car = await model.deleteCar(req.params.id);
    if (car === false) {
      return res.status(404).send('Not found');
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  };
};

module.exports = {
  addCar,
  getCars,
  getCar,
  updateCar,
  partialUpdate,
  deleteCar
};