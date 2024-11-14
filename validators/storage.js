const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator');

const idValidator = [
    check('id')
        .exists()
        .notEmpty()
        .isMongoId(),
    (request, response, next) => {
        return validationResults(request, response, next);
    },
];

module.exports = { idValidator };
