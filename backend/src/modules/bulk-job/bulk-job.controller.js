const bulkJobService = require("./bulk-job.service");

async function getAllBulkJob(req, res) {
  const bulkJobs = await bulkJobService.getAllBulkJob();
  res.json(bulkJobs);
}

async function getBulkJobById(req, res) {
  
  const bulkJob = await bulkJobService.getBulkJobById(req.params.job_id);
  if (!bulkJob) {
      return res.status(404).json({ message: "Job id not found" });
    }
  res.json(bulkJob);
}


module.exports = { getAllBulkJob, getBulkJobById };
