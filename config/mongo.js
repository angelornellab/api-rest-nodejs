const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = async () => {
    try {
        const DB_HOST = (NODE_ENV === 'test') ? process.env.DB_HOST_TEST :  process.env.DB_HOST;

        await mongoose.connect(DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connection successfully');
    } catch (error) {
        console.log('Connection error:', error);
    }
};

module.exports = dbConnect;
