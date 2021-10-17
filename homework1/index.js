const fs = require('fs');
const request = require('request');


const read = (fileName) => {
  return new Promise((success, fail) => {
    fs.readFile(fileName, (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

const write = (fileName, data) => {
  return new Promise((success, fail) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};



const currency = async () => {
  try {
    let currencyData = await read("country-by-currency-name.json");
    let parsedCurrencyData = JSON.parse(currencyData);
    let numberOfCountries = 0;
    let filterCurrencyData = [];
    //console.log(parsedCurrencyData);
    parsedCurrencyData.forEach(dolar => {
      if (dolar.currency_name !== null) {
        if (dolar.currency_name.includes("Dollar")) {
          //console.log(dolar);
          numberOfCountries++;
          filterCurrencyData.push(dolar);
        }
      }
    })
    console.log(numberOfCountries);
    console.log(filterCurrencyData);
    let jsonCurrencyData = JSON.stringify(filterCurrencyData);
    await write('dolar-countries.json', jsonCurrencyData);
  } catch (err) {
    console.log(err);
  }
};




const religion = async () => {
  try {
    let religionData = await read('country-by-religion.json');
    let parsedReligionData = JSON.parse(religionData);
    //console.log(parsedReligionData);
    let numberOfChristianityCountries = 0;
    let namesOfChristianityCountries = [];
    let numberOfIslamCountries = 0;
    let namesOfIslamCountries = [];
    let numberOfBuddhismCountries = 0;
    let namesOfBuddhismCountries = [];
    parsedReligionData.forEach(rell => {
      if (rell.religion === "Christianity") {
        //console.log(rell);
        numberOfChristianityCountries++;
        namesOfChristianityCountries.push(rell.country);
      }
      if (rell.religion === "Islam") {
        numberOfIslamCountries++;
        namesOfIslamCountries.push(rell.country);
      }
      if (rell.religion === "Buddhism") {
        numberOfBuddhismCountries++;
        namesOfBuddhismCountries.push(rell.country);
      }
    })
    console.log(numberOfChristianityCountries);
    console.log(numberOfIslamCountries);
    console.log(numberOfBuddhismCountries);
  } catch (err) {
    console.log(err);
  }
};




const region = async () => {
  try {
    let countriesData = await read('country-by-region-in-world.json');
    let parsedCountriesData = JSON.parse(countriesData);
    //console.log(parsedCountriesData);
    let numberOfEuropeCountries = 0;
    let numberOfAfricaCountries = 0;
    let numberOfMiddleEastCountries = 0;
    let numberOfPolynesiaCountries = 0;
    let numberOfNordicCountriesCountries = 0;
    let others = 0;
    parsedCountriesData.forEach(element => {
      if (element.location !== null) {
        switch (true) {
          case element.location.includes('Europe'):
            numberOfEuropeCountries++;
            break;
          case element.location.includes('Africa'):
            numberOfAfricaCountries++;
            break;
          case element.location.includes('Middle East'):
            numberOfMiddleEastCountries++;
            break;
          case element.location.includes('Polynesia'):
            numberOfPolynesiaCountries++;
            break;
          case element.location.includes('Nordic Countries'):
            numberOfNordicCountriesCountries++;
            break;
          default:
            others++;
        }
      }
    })
    console.log(numberOfEuropeCountries);
    console.log(numberOfAfricaCountries);
    console.log(numberOfMiddleEastCountries);
    console.log(numberOfPolynesiaCountries);
    console.log(numberOfNordicCountriesCountries);
    console.log(others);
  } catch (err) {
    console.log(err)
  }
};




const landlockedCountries = async () => {
  try {
    let landlockedData = await read('country-by-landlocked.json');
    let parsedLandlockedData = JSON.parse(landlockedData);
    //console.log(parsedLandlockedData);
    let areLandlockedCountries = 0;
    let areNotLandlockedCountries = 0;
    parsedLandlockedData.forEach(element => {
      if (element.landlocked !== null) {
        switch (element.landlocked) {
          case '1':
            areLandlockedCountries++;
            break;
          case '0':
            areNotLandlockedCountries++;
            break;
          default:
            console.log(element);
        }
      }
    })
    console.log(areLandlockedCountries);
    console.log(areNotLandlockedCountries);
  } catch (err) {
    console.log(err)
  }
};




const elevation = async () => {
  try {
    let elevationData = await read('country-by-elevation.json');
    let parsedElevationData = JSON.parse(elevationData);
    //console.log(parsedElevationData);
    parsedElevationData.sort(function (a, b) {
      return b.elevation - a.elevation;
    });
    //console.log(parsedElevationData);
    const slicedElevationData = parsedElevationData.slice(0, 6);
    console.log(slicedElevationData);
    parsedElevationData.forEach(element => {
      if (element.country.includes('Macedonia')) {
        console.log(element);
      }
    })
  } catch (err) {
    console.log(err);
  }
};



// read('country-by-yearly-average-temperature.json')
//   .then(data => {
//     let countryTemperatureData = JSON.parse(data);
//     //console.log(countryTemperatureData);
//     const filtredcountryTemperatureData = countryTemperatureData.filter(temp => temp.temperature !== null);
//     filtredcountryTemperatureData.sort(function (a, b) {
//       return a.temperature - b.temperature;
//     });
//     const slicedcountryTemperatureData = filtredcountryTemperatureData.slice(0, 6);
//     console.log(slicedcountryTemperatureData);
//     let jsonSlicedData = JSON.stringify(slicedcountryTemperatureData);
//     write('temperature.json', jsonSlicedData)
//   })
//   .catch(err => {
//     console.log(err);
//   });


// read('country-by-avg-male-height.json')
//   .then(data => {
//     let jsonData = JSON.parse(data);
//     jsonData.sort(function (a, b) {
//       return b.height - a.height;
//     })
//     let slicedData = jsonData.slice(0, 10);
//     console.log(slicedData);
//     let stringifiedJsonData = JSON.stringify(slicedData);
//     write('country-height.json', stringifiedJsonData)
//   })
//   .catch(err => {
//     console.log(err);
//   });


// read('country-by-life-expectancy.json')
//   .then(data => {
//     let jsonData = JSON.parse(data);
//     let filteredJsonData = jsonData.filter(element => element.expectancy !== null);
//     //console.log(filteredJsonData);
//     filteredJsonData.sort(function (a, b) {
//       return a.expectancy - b.expectancy;
//     });
//     let slicedJsonData = filteredJsonData.slice(0, 6);
//     console.log(slicedJsonData);
//   })
//   .catch(err => {
//     console.log(err);
//   });




// request({
//   url: 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-government-type.json',
//   json: true
// }, (error, response, body) => {
//   !error && response.statusCode === 200
//     ? console.log(body)
//     : console.log(error)

//   let countryGovernments = body;
//   let numberOfRepublics = 0;
//   let numberOfMonarchies = 0;
//   let others = 0;
//   let namesOfMonarchies = [];
//   countryGovernments.forEach(element => {
//     if (element.government !== null) {
//       switch (true) {
//         case element.government.includes("Republic"):
//           numberOfRepublics++;
//           break;
//         case element.government.includes("Monarchy"):
//           numberOfMonarchies++;
//           namesOfMonarchies.push(element);
//           break;
//         default:
//           others++;
//       }
//     }
//   });
//   console.log(numberOfRepublics);
//   console.log(numberOfMonarchies);
//   console.log(others);
//   let jsonnamesOfMonarchies = JSON.stringify(namesOfMonarchies);
//   write('monarchies.json', jsonnamesOfMonarchies);
// });




// request({
//   url: 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-life-expectancy.json',
//   json: true
// }, (error, response, body) => {
//   !error && response.statusCode === 200
//     ? console.log(body)
//     : console.log(error)
//   let lifeExpectancy = body;
//   lifeExpectancy.sort(function (a, b) {
//     return b.expectancy - a.expectancy;
//   });
//   let slicedlifeExpectancy = lifeExpectancy.slice(0, 6);
//   console.log(slicedlifeExpectancy);
// });


request({
  url: 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-independence-date.json',
  json: true
}, (error, response, body) => {
  !error && response.statusCode === 200
    ? console.log(body)
    : console.log(error)
  let independenceData = body;
  let filteredCountries = [];
  independenceData.forEach(element => {
    if (element.independence > 1800 && element.independence < 1900) {
      filteredCountries.push(element);
    }
  });
  //console.log(filteredCountries);
  filteredCountries.sort(function (a, b) {
    return a.independence - b.independence;
  });
  let jsonFilteredCountries = JSON.stringify(filteredCountries);
  write('independenceCountries.json', jsonFilteredCountries)
});





//elevation();
//landlockedCountries();
//region()
//religion();
//currency();

