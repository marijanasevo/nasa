const http = require('http');
require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { getAllPlanets } = require('./model/planets.model');
const { getAllLaunches } = require('./model/launches.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await getAllPlanets();
  await getAllLaunches();

  server.listen(PORT, async () => {
    console.log('Running on port ' + PORT);
  });
}

startServer();
