const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');
const { userModel } = require('../models');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();


const authMiddleware = async (request, response, next) => {
    try {
        if (!request.headers.authorization) {
            handleHttpError(response, 'Not token', 401);
            return;
        }

        const token = request.headers.authorization.split(' ').pop();
        const data = await verifyToken(token);

        if (!data) {
            handleHttpError(response, 'No payload data', 401);
            return;
        }

        const query = {
            [propertiesKey.id]: data[propertiesKey.id]
        };


        const user = await userModel.findOne(query);
        request.user = user;
        

        next();
        
    } catch (error) {
        handleHttpError(response, 'Session error', 401);
    }
};

module.exports = authMiddleware;
