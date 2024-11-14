const { storageModel } = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Get list
 * @param {*} request 
 * @param {*} response 
 */
const getItems = async (request, response) => {
    try {   
        const data = await storageModel.find({});
    
        response.send({ data });
    } catch (error) {
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
        const data = await storageModel.findById(id);
    
        response.send({ data });
    } catch (error) {
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
        const { body, file } = request;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
        };
        console.log(file);
    
        const data = await storageModel.create(fileData);
        
        response.status(201);
        response.send({data});
    } catch (error) {
        handleHttpError(response, 'Create item error');
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
        const storage = await storageModel.findById(id);
        const { filename } = storage;
        const filePath = `${MEDIA_PATH}/${filename}`;
        
        fs.unlinkSync(filePath);

        // await storageModel.delete({ _id: id });
        await storageModel.deleteOne({ _id: id });

        response.send({
            filePath,
            deleted: 1,
        });
    } catch (error) {
        handleHttpError(response, 'Delete item error');
    }
};

module.exports = { getItems, getItem, createItem, deleteItem };
