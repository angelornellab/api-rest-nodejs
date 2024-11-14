const customHeader = (request, response, next) => {
    try {
        const apiKey = request.headers.api_key;

        if (apiKey === '12345') {
            next();
        }else{
            response.status(403);
            response.send({
                error: 'Invalid api key',
            });
        }

    } catch (error) {
        response.status(403);
        response.send({
            error: 'Custom header error',
        });
    }
};

module.exports = customHeader;
