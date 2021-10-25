const fs = require('./file_system');
const cf = 'cars.json';

const addCar = async (req) => {
  let carsData = await fs.read(cf);
  let id = 1;
  if (carsData.length !== 0) {
    id = carsData[carsData.length - 1].id + 1;
  };
  let car = {
    id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    year: req.body.year,
    class: req.body.class,
    engine: req.body.engine,
    gear: req.body.gear
  };
  carsData = [...carsData, car]
  await fs.write(cf, carsData);
  return car;
};

const getCars = async () => {
  let carsData = await fs.read(cf);
  return carsData;
};

const getCar = async (req) => {
  let carsData = await fs.read(cf);
  let car = carsData.filter(car => car.id === Number(req.params.id));
  if (car.length === 0) {
    return false;
  }
  return car[0];
};

const updateCar = async (req) => {
  let carsData = await fs.read(cf);
  let postoiId = false;

  carsData.forEach(car => {
    if (car.id == req.params.id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  carsData = carsData.map(c => {
    if (c.id === Number(req.params.id)) {
      c.name = req.body.name;
      c.manufacturer = req.body.manufacturer;
      c.year = req.body.year;
      c.class = req.body.class;
      c.engine = req.body.engine;
      c.gear = req.body.gear;
    }
    return c;
  });
  await fs.write(cf, carsData);
};

const partialUpdate = async (req) => {
  let carsData = await fs.read(cf);
  let postoiId = false;

  carsData.forEach(car => {
    if (car.id == req.params.id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  carsData = carsData.map(c => {
    if (c.id === Number(req.params.id)) {
      c.name = req.body.name ? req.body.name : c.name;
      c.manufacturer = req.body.manufacturer ? req.body.manufacturer : c.manufacturer;
      c.year = req.body.year ? req.body.year : c.year;
      c.class = req.body.class ? req.body.class : c.class;
      c.engine = req.body.engine ? req.body.engine : c.engine;;
      c.gear = req.body.gear ? req.body.gear : c.gear;
    }
    return c;
  });
  await fs.write(cf, carsData);
};

const deleteCar = async (req) => {
  let carsData = await fs.read(cf);
  let prevLength = carsData.length;
  carsData = carsData.filter(c => c.id !== Number(req.params.id));
  if (carsData.length === prevLength) {
    return false;
  }
  await fs.write(cf, carsData);
}

module.exports = {
  addCar,
  getCars,
  getCar,
  updateCar,
  partialUpdate,
  deleteCar
}