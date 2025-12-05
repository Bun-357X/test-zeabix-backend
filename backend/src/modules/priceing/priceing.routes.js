const express = require("express");
const router = express.Router();
const priceingController = require("./priceing.controller");
const authenticate = require("../../middleware/auth.middleware"); // Import middleware

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

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
 *         description: คำนวน price ไม่สำเร็จ
 */
router.post("/price", authenticate, priceingController.caculatePrice);

/**
 * @swagger
 * /api/quotes/bulk:
 *   post:
 *     summary: คำนวน price แบบ bulk จาก csv
 *     tags: [Price]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์ CSV ที่ต้องการอัปโหลด
 *     responses:
 *       200:
 *         description: รอคำนวน bulk price 
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
 *                     job_id:
 *                       type: integer
 *       404:
 *         description: รอคำนวน bulk price  ไม่สำเร็จ
 */
router.post("/bulk",  upload.single("file"), authenticate, priceingController.caculatePriceBulk);


module.exports = router;
