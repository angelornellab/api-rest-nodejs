const { validationResult } = require('express-validator');

const validationResults = (request, response, next) => {
    try {
        validationResult(request).throw();

        return next(); // to controller
    } catch (error) {
        response.status(403);
        response.send({
            errors: error.array(),
        });
    }
};

module.exports = validationResults;  
