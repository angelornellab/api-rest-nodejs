const { userModel } = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign, verifyToken} = require('../utils/handleJwt');



/**
 * Login user
 * @param {*} request 
 * @param {*} response 
 */
const login = async (request, response) => {
    try {
        request = matchedData(request);

        const user = await userModel.findOne({ email: request.email });
       

        if (!user) {
            handleHttpError(response, 'User not found', 404);
            return;
        }

        const hash = user.password;
        const check = await compare(request.password, hash);
       
        if (!check) {
            handleHttpError(response, 'Invalid password', 401);
            return;
        }

        user.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(user),
            user,
        }

        response.send({ data });

    } catch (error) {
        handleHttpError(response, 'Login user error');
    }
};


/**
 * Register user
 * @param {*} request 
 * @param {*} response 
 */
const register = async (request, response) => {
    try {
        request = matchedData(request);

        const password = await encrypt(request.password);
        const body = { ...request, password }
        const user = await userModel.create(body);
        console.log(user);
    
        user.set('password', undefined, { strinct: false })
        
        response.status(201);
        response.send({
            token:  await tokenSign(user),
            user: user,
        });
    } catch (error) {
        handleHttpError(response, 'Register user error');
    }
};

module.exports = { login, register };
