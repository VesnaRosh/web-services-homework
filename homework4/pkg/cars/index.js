const fs = require('../fs');
const cf = '../../cars.json';

const addCar = async (carBody) => {
  let carsData = await fs.read(cf);
  let id = 1;
  if (carsData.length !== 0) {
    id = carsData[carsData.length - 1].id + 1;
  };
  let car = {
    id,
    name: carBody.name,
    manufacturer: carBody.manufacturer,
    year: carBody.year,
    class: carBody.class,
    engine: carBody.engine,
    gear: carBody.gear
  };
  carsData = [...carsData, car]
  await fs.write(cf, carsData);
  return car;
};

const getCars = async () => {
  let carsData = await fs.read(cf);
  return carsData;
};

const getCar = async (id) => {
  let carsData = await fs.read(cf);
  let car = carsData.filter(car => car.id === Number(id));
  if (car.length === 0) {
    return false;
  }
  return car[0];
};

const updateCar = async (id, carBody) => {
  let carsData = await fs.read(cf);
  let postoiId = false;

  carsData.forEach(car => {
    if (car.id == id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  carsData = carsData.map(c => {
    if (c.id === Number(id)) {
      c.name = carBody.name;
      c.manufacturer = carBody.manufacturer;
      c.year = carBody.year;
      c.class = carBody.class;
      c.engine = carBody.engine;
      c.gear = carBody.gear;
    }
    return c;
  });
  await fs.write(cf, carsData);
};

const partialUpdate = async (id, carBody) => {
  let carsData = await fs.read(cf);
  let postoiId = false;

  carsData.forEach(car => {
    if (car.id == id) {
      postoiId = true;
    }
  })

  if (postoiId == false) {
    return false;
  }
  carsData = carsData.map(c => {
    if (c.id === Number(id)) {
      c.name = carBody.name ? carBody.name : c.name;
      c.manufacturer = carBody.manufacturer ? carBody.manufacturer : c.manufacturer;
      c.year = carBody.year ? carBody.year : c.year;
      c.class = carBody.class ? carBody.class : c.class;
      c.engine = carBody.engine ? carBody.engine : c.engine;;
      c.gear = carBody.gear ? carBody.gear : c.gear;
    }
    return c;
  });
  await fs.write(cf, carsData);
};

const deleteCar = async (id) => {
  let carsData = await fs.read(cf);
  let prevLength = carsData.length;
  carsData = carsData.filter(c => c.id !== Number(id));
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
};