const { trackModel } = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

/**
 * Get list
 * @param {*} request 
 * @param {*} response 
 */
const getItems = async (request, response) => {
    try {
        console.log(request);
        const data = await trackModel.findAllData(); // findAll()
    
        response.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(response, 'Get items error');
    }
};

/**
 * Get detail
 * @param {*} request 
 * @param {*} response 
 */
const getItem = async (request, response) => {
    try {
        const { id } = matchedData(request);
        const data = await trackModel.findOneData(id);
    
        response.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(response, 'Get item error');
    }
};

/**
 * Create record
 * @param {*} request 
 * @param {*} response 
 */
const createItem = async (request, response) => {
    try {
        // const { body } = request;
        // console.log(body);
        const body = matchedData(request);
        const data = await trackModel.create(body);
        
        response.status(201);
        response.send({data});
    } catch (error) {
        console.log('**********errorrrrrrrrrrrrrrrrrrr');
        console.log(error);
        console.log('**********errorrrrrrrrrrrrrrrrrrr');
        handleHttpError(response, 'Create item error');
    }
};

/**
 * Update record
 * @param {*} request 
 * @param {*} response 
 */
const updateItem = async (request, response) => {
    try {
        // const { body } = request;
        // console.log(body);
        const { id, ...body } = matchedData(request);
        console.log(id);

        const data = await trackModel.findByIdAndUpdate(
            id,
            body
        );

        response.send({data});
        
    } catch (error) {
        console.log(error);
        handleHttpError(response, 'Update item error');
    }
};

/**
 * Delete record
 * @param {*} request 
 * @param {*} response 
 */
const deleteItem = async (request, response) => {
    try {
        const { id } = matchedData(request);
        // const data = await trackModel.deleteOne({ _id: id });
        const deleteResponse = await trackModel.delete({ _id: id });
        const data = {
            deleted: deleteResponse.matchedCount
        }
    
        response.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(response, 'Delete item error');
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
