const { parse } = require('csv-parse');
const { createReadStream } = require('fs');
const path = require('path');
const planets = require('./planets.mongo');
const { count } = require('console');

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_telescope_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async data => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', err => reject(err))
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(
          'Habitable planets loaded successfully ' + countPlanetsFound
        );
        resolve(countPlanetsFound);
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
