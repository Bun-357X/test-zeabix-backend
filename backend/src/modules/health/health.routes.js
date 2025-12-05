const express = require("express");
const router = express.Router();
const healthController = require("./health.controller");
const authenticate = require("../../middleware/auth.middleware"); // Import middleware


/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: เช็ค system health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: เช็ค system health
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 error:
 *                   type: json
 */
router.get("/", authenticate , healthController.checkSystemHealth);



module.exports = router;
