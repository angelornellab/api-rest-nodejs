const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(request, file, callBack) {
        const pathStorage = `${__dirname}/../storage`;

        callBack(null, pathStorage);
    },
    filename: function(request, file, callBack) {
        const extension = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${extension}`;

        callBack(null, filename);
    },
});

const uploadMiddleware = multer({
    storage,
});

module.exports = uploadMiddleware;
