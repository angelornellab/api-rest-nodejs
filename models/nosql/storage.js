const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Storage = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        filename: {
            type: String,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false,
    },
);

Storage.plugin(
    mongooseDelete, 
    { 
        overrideMethods: 'all', 
    }
);

module.exports = mongoose.model('storages', Storage);
