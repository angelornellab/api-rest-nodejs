const express = require('express');
const router = express.Router();
const { getItems, getItem, createItem, deleteItem } = require('../controllers/storage');
const { idValidator } = require('../validators/storage');
const uploadMiddleware = require('../utils/handleStorage');

// https://localhost/storages GET, POST, DELETE, PUT

/**
 * Get list
 * @openapi
 * /storages:
 *    get:
 *      tags:
 *        - storages
 *      summary: "List files"
 *      description: Get all file lists
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the list of files.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storages'
 *        '422':
 *          description: Validation error.
 */
router.get('/', getItems);

/**
 * Get detail
 * @openapi
 * /storages/{id}:
 *    get:
 *      tags:
 *        - storages
 *      summary: "Storage detail"
 *      description: Get the details of a storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Storage ID to return
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the storage object.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storages'
 *        '422':
 *          description: Validation error.
 */
router.get('/:id', idValidator,  getItem);

/**
 * Create record
 * @openapi
 * /storages:
 *    post:
 *      tags:
 *        - storages
 *      summary: "Upload file"
 *      description: Upload a file
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the object inserted in the collection.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Returns the object inserted in the collection with status '201'
 *      '403':
 *        description: You do not have '403' permissions
 */
router.post('/', uploadMiddleware.single('myfile'), createItem);

/**
 * Delete record
 * @openapi
 * /storages/{id}:
 *    delete:
 *      tags:
 *        - storages
 *      summary: "Delete storage"
 *      description: Delete the detail of a storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Song ID to return
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the storage object.
 *        '422':
 *          description: Validation error.
 */
router.delete('/:id', idValidator, deleteItem);

module.exports = router;
