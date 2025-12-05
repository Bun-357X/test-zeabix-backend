const express = require("express");
const router = express.Router();
const bulkJobController = require("./bulk-job.controller");
const authenticate = require("../../middleware/auth.middleware"); // Import middleware


/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: ดึงข้อมูล bulk-job
 *     tags: [BulkJob]
 *     responses:
 *       200:
 *         description: คืนค่ารายการ bulk-job ทั้งหมด
 */
router.get("/", authenticate , bulkJobController.getAllBulkJob);


/**
 * @swagger
 * /api/jobs/{job_id}:
 *   get:
 *     summary: ดึงข้อมูล bulk-job ตาม ID
 *     tags: [BulkJob]
 *     parameters:
 *       - in: path
 *         name: job_id
 *         required: true
 *         description: job_id  bulk-job ตาม ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: พบ bulk-job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 result_data:
 *                   type: json
 *                 status:
 *                   type: boolean
 *       404:
 *         description: ไม่พบ bulk-job
 */
router.get("/:job_id", authenticate, bulkJobController.getBulkJobById);


module.exports = router;
