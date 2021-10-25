const model = require('./model');


const addCar = async (req, res) => {
  try {
    let condition = !req.body.name
      || !req.body.manufacturer
      || !req.body.year
      || !req.body.class
      || !req.body.engine
      || !req.body.gear;
    if (condition) {
      return res.status(400).send('Bad request');
    }
    let car = await model.addCar(req);
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
    let car = await model.getCar(req);
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
    let condition = !req.body.name
      || !req.body.manufacturer
      || !req.body.year
      || !req.body.class
      || !req.body.engine
      || !req.body.gear;
    if (condition) {
      return res.status(400).send('Bad request');
    }
    let car = await model.updateCar(req);
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
    let condition = req.body.name
      || req.body.manufacturer
      || req.body.year
      || req.body.class
      || req.body.engine
      || req.body.gear;
    if (!condition) {
      return res.status(400).send('Bad request');
    }
    let car = await model.partialUpdate(req);
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
    let car = await model.deleteCar(req);
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
}