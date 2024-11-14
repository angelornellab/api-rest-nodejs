const express = require('express');
const router = express.Router();
const customHeader = require('../middleware/customHeader');
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
const { idValidator, payloadValidator } = require('../validators/track');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/track');


// https://localhost/tracks GET, POST, DELETE, PUT+

/**
 * Get list
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "List traks"
 *      description: Get all the song lists
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the song lists.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/tracks'
 *        '422':
 *          description: Validation error.
 */
router.get(
    '/', 
    authMiddleware, 
    getItems
);

/**
 * Get detail
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Track detail"
 *      description: Get the details of a song
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
 *          description: Returns the song object.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tracks'
 *        '422':
 *          description: Validation error.
 */
router.get(
    '/:id', 
    authMiddleware, 
    idValidator, 
    getItem
);

/**
 * Create record
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Register track"
 *      description: Register a song and get the registration details
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the object inserted in the collection.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/tracks"
 *    responses:
 *      '201':
 *        description: Returns the object inserted in the collection with status '201'
 *      '403':
 *        description: You do not have '403' permissions
 */
router.post(
    '/', 
    authMiddleware,
    checkRol(['admin']),
    payloadValidator,
    // customHeader,
    createItem
);


/**
 * Update record
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Update track"
 *      description: Update a song and get the registration details
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
 *          description: Returns the updated object in the collection.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/tracks"
 *    responses:
 *      '201':
 *        description: Returns the object inserted in the collection with status '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/tracks'
 *      '403':
 *        description: You do not have '403' permissions
 */
router.put(
    '/:id',
    authMiddleware,
    idValidator, 
    payloadValidator,
    updateItem
);

/**
 * Delete record
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Delete track"
 *      description: Delete the detail of a song
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
 *          description: Returns the song object.
 *        '422':
 *          description: Validation error.
 */
router.delete(
    '/:id',
    authMiddleware,
    idValidator, 
    deleteItem
);

module.exports = router;
