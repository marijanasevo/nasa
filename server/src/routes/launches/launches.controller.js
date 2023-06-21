const {
  getLaunches,
  scheduleNewLaunch,
  abortLaunch,
  existsLaunch,
} = require('../../model/launches.model');

const { getPagination } = require('../../services/query');

async function httpGetLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'invalid launch date' });
  }

  const newLaunch = await scheduleNewLaunch(launch);
  return res.status(201).json(newLaunch);
}

async function httpDeleteLaunch(req, res) {
  const id = Number(req.params.id);

  const launchExists = await existsLaunch(id);
  if (!launchExists) {
    return res.status(404).json({ error: 'Launch not found' });
  }

  const aborted = await abortLaunch(id);

  if (aborted) return res.status(200).json({ ok: true });
  else res.status(400).json({ error: 'Something unexpected happened' });
}

module.exports = { httpGetLaunches, httpAddNewLaunch, httpDeleteLaunch };
