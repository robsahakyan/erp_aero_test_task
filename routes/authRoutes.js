import express from 'express';
import { signIn, signUp, refreshToken, logout } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in
 *     description: Authenticate user and return access and refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', signIn);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up
 *     description: Register a new user and return access and refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
router.post('/signup', signUp);

/**
 * @swagger
 * /signin/new_token:
 *   post:
 *     summary: Refresh token
 *     description: Refresh access token using the refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Invalid refresh token
 */
router.post('/signin/new_token', refreshToken);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out
 *     description: Log out the user and invalidate the refresh token
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/logout', logout);

export default router;
