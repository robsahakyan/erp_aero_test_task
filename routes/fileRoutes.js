import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { uploadFile, listFiles, getFile, deleteFile, downloadFile, updateFile } from '../controllers/fileController.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extension);
      cb(null, `${basename}-${uniqueSuffix}${extension}`);
    }
  });
  
  const upload = multer({ storage: storage });

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server and save its metadata in the database
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       500:
 *         description: Server error
 */
router.post('/file/upload', authenticateToken, upload.single('file'), uploadFile);

/**
 * @swagger
 * /file/list:
 *   get:
 *     summary: List files
 *     description: Retrieve a paginated list of files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: list_size
 *         schema:
 *           type: integer
 *         description: Number of files per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of files
 *       500:
 *         description: Server error
 */
router.get('/file/list', authenticateToken, listFiles);

/**
 * @swagger
 * /file/{id}:
 *   get:
 *     summary: Get file details
 *     description: Retrieve metadata of a file by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File details
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get('/file/:id', authenticateToken, getFile);

/**
 * @swagger
 * /file/delete/{id}:
 *   delete:
 *     summary: Delete file
 *     description: Delete a file from the server and remove its metadata from the database
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.delete('/file/delete/:id', authenticateToken, deleteFile);

/**
 * @swagger
 * /file/download/{id}:
 *   get:
 *     summary: Download file
 *     description: Download a file by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get('/file/download/:id', authenticateToken, downloadFile);

/**
 * @swagger
 * /file/update/{id}:
 *   put:
 *     summary: Update file
 *     description: Update a file's metadata and content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
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
 *     responses:
 *       200:
 *         description: File updated successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.put('/file/update/:id', authenticateToken, upload.single('file'), updateFile);

export default router;

