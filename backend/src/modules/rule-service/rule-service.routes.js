const express = require("express");
const router = express.Router();
const ruleServiceController = require("./rule-service.controller");
const authenticate = require("../../middleware/auth.middleware"); // Import middleware


/**
 * @swagger
 * /api/rule-services:
 *   get:
 *     summary: ดึงข้อมูล rule-service
 *     tags: [RuleService]
 *     responses:
 *       200:
 *         description: คืนค่ารายการ rule-service ทั้งหมด
 */
router.get("/", authenticate , ruleServiceController.getRuleServices);

/**
 * @swagger
 * /api/rule-services:
 *   post:
 *     summary: เพิ่ม rule-services
 *     tags: [RuleService]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               priority:
 *                 type: integer
 *               effective_from:
 *                 type: string
 *                 format: date
 *               effective_to:
 *                 type: string
 *                 format: date
 *               is_active:
 *                 type: boolean
 *               config_data:
 *                 type: object
 *     responses:
 *       201:
 *         description: rule-services ถูกสร้างสำเร็จ
 */
router.post("/", authenticate, ruleServiceController.addRuleService);
/**
 * @swagger
 * /api/rule-services/{id}:
 *   put:
 *     summary: อัปเดตข้อมูล rule-services ตาม ID
 *     tags: [RuleService]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของผู้ใช้ที่ต้องการอัปเดต
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               priority:
 *                 type: integer
 *               effective_from:
 *                 type: string
 *                 format: date
 *               effective_to:
 *                 type: string
 *                 format: date
 *               is_active:
 *                 type: boolean
 *               config_data:
 *                 type: object
 *     responses:
 *       200:
 *         description: rule-services ได้รับการอัปเดต
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 type:
 *                   type: string
 *                 priority:
 *                   type: integer
 *                 effective_from:
 *                   type: string
 *                   format: date
 *                 effective_to:
 *                   type: string
 *                   format: date
 *                 is_active:
 *                   type: boolean
 *                 config_data:
 *                   type: object
 *       404:
 *         description: ไม่พบ rule-services
 */
router.put("/:id", authenticate, ruleServiceController.updateRuleService);

/**
 * @swagger
 * /api/rule-services/{id}:
 *   delete:
 *     summary: ลบ rule-services ตาม ID (soft delete)
 *     tags: [RuleService]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ของผู้ใช้ที่ต้องการลบ
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: rule-services ลบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success delete ruleService"
 *       404:
 *         description: ไม่พบ rule-services
 */
router.delete("/:id", authenticate, ruleServiceController.deleteRuleService);

module.exports = router;
