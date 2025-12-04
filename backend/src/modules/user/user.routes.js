const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authenticate = require("../../middleware/auth.middleware"); // Import middleware


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้ทั้งหมด
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: คืนค่ารายการผู้ใช้ทั้งหมด
 */
router.get("/", authenticate , userController.getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: เพิ่มผู้ใช้ใหม่
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: ผู้ใช้ถูกสร้างสำเร็จ
 */
router.post("/", authenticate, userController.addUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: อัปเดตข้อมูลผู้ใช้ตาม ID
 *     tags: [Users]
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ผู้ใช้ได้รับการอัปเดต
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: ไม่พบผู้ใช้
 */
router.put("/:id", authenticate, userController.updateUser);

module.exports = router;
