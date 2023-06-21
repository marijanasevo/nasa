const { getAllPlanets } = require('../../model/planets.model');

async function getPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

module.exports = { getPlanets };
