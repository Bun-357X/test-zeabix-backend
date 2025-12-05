const BulkJob = require("./bulk-job.model");

async function getAllBulkJob(raw = false) {
  return await BulkJob.findAll({where: { delete_flag: false }, raw: raw});
}

async function getBulkJobById(id, raw = false) {
  return await BulkJob.findByPk(id, {raw: raw});
}

async function createBulkJob(data) {
  return await BulkJob.create(data);
}

async function updateBulkJob(id, data) {

  let updatedBulkJob = null
  let updatedCount= await BulkJob.update(data, {
    where: { id },
  });

  if (updatedCount > 0) {
    updatedBulkJob = await BulkJob.findByPk(id);

  }
  return updatedBulkJob
}

async function deleteBulkJob(id) {

  let deleteCount= await BulkJob.update({"delete_flag": true}, {
    where: { id },
  });
  return deleteCount
}

module.exports = { getAllBulkJob, getBulkJobById, createBulkJob, updateBulkJob, deleteBulkJob };
