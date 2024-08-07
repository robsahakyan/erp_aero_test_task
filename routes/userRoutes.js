import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getUserInfo } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related endpoints
 */

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Get user info
 *     security:
 *      - bearerAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User info
 *       404:
 *         description: User not found
 */
router.get('/info', authenticateToken, getUserInfo);

export default router;
