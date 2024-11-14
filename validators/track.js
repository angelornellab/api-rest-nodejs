const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator');

const payloadValidator = [
    check('name')
        .exists()
        .notEmpty(),
        // .isLength({ min: 5, max: 90 }),
    check('album')
        .exists()
        .notEmpty(),
    check('cover')
        .exists()
        .notEmpty(),
    check('artist.name')
        .exists()
        .notEmpty(),
    check('artist.nickname')
        .exists()
        .notEmpty(),
    check('artist.nationality')
        .exists()
        .notEmpty(),
    check('duration.start')
        .exists()
        .notEmpty(),
    check('duration.end')
        .exists()
        .notEmpty(),
    check('mediaId')
        .exists()
        .notEmpty(),
    (request, response, next) => {
        return validationResults(request, response, next);
    },
];

const idValidator = [
    check('id')
        .exists()
        .notEmpty(),
    (request, response, next) => {
        return validationResults(request, response, next);
    },
];

module.exports = { payloadValidator, idValidator };
