require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const openApiConfigration = require('./docs/swagger');
const morganBody = require('morgan-body');
const loggerStream = require('./utils/handleLogger');
const dbConnect = require('./config/mongo');
const { dbConnectMysql } = require('./config/mysql');

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('storage'));

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function(request, response) {
        return response.statusCode < 400
    },
});

app.use('/documentation',
    swaggerUI.serve, 
    swaggerUI.setup(openApiConfigration)
);

app.use('/api', require('./routes'));


if (NODE_ENV != 'test') {
    app.listen(port, () => {

    });
}

(ENGINE_DB === 'nosql') ? dbConnect() : dbConnectMysql();

module.exports = app;
