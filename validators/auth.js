const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator');


const registryValidator = [
    check('name')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 99 }),
    check('edad')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('password')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    (request, response, next) => {
        return validationResults(request, response, next);
    },
];

const loginValidator = [
    check('password')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    (request, response, next) => {
        return validationResults(request, response, next);
    },
];

module.exports = { registryValidator, loginValidator };
