const express = require('express');
const {
  httpGetLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpDeleteLaunch);

module.exports = launchesRouter;
