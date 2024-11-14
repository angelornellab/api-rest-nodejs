const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth');
const { registryValidator, loginValidator } = require('../validators/auth');

// https://localhost/api/auths GET, POST, DELETE, PUT+

/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auths/register:
 *      post:
 *          tags:
 *              - auths
 *          summary: "Register new user"
 *          description: "This route is to register a new user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: The user registers correctly
 *                  '403':
 *                      description: Validation error
 */
router.post('/register', registryValidator, register);

/**
 * Login user
 * @openapi
 * /auths/login:
 *    post:
 *      tags:
 *        - auths
 *      summary: "Login user"
 *      description: Login a new user and get the session token
 *      responses:
 *        '200':
 *          description: Returns the object inserted in the collection
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: Returns the object inserted in the collection with status '201'
 *      '403':
 *        description: Permissions error '403'
 */
router.post('/login', loginValidator, login);

module.exports = router;
