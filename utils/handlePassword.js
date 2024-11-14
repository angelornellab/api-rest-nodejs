const bcryptjs = require('bcryptjs');

/**
 * Unencrypted password
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    return await bcryptjs.hash(passwordPlain, 10);
};

/**
 * Compare password
 * @param {*} passwordPlain 
 * @param {*} hash 
 */
const compare = async (passwordPlain, hash) => {
    return await bcryptjs.compare(passwordPlain, hash);
};

module.exports = { encrypt, compare };
