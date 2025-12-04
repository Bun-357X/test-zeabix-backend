const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login
 *     tags: [login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: token
 *         content: # <-- Correctly indented 'content'
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *         content: # <-- Correctly indented 'content'
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.post("/login", authController.login);

module.exports = router;
