const express = require("express");
const router = express.Router();
const priceingController = require("./priceing.controller");
const authenticate = require("../../middleware/auth.middleware"); // Import middleware

/**
 * @swagger
 * /api/quotes/price:
 *   post:
 *     summary: คำนวน price
 *     tags: [Price]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: integer
 *               post_code:
 *                 type: integer
 *     responses:
 *       200:
 *         description: คำนวน price สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: integer
 *                     rule_use:
 *                       type: object
 *       404:
 *         description: ไม่พบ rule-services
 */
router.post("/price", authenticate, priceingController.caculatePrice);

module.exports = router;
