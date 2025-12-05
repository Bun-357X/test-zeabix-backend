const healthService = require("./health.service")

async function checkSystemHealth(req, res) {
  //

  res.json(await healthService.checkSQLite());
}

module.exports = { checkSystemHealth };
