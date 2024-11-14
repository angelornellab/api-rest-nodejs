

const handleHttpError = (response, message = '', code = 403) => {
    response.status(code);
    response.send({
        error: message,
    })
};

module.exports = { handleHttpError };
