const { handleHttpError } = require('../utils/handleError');

const checkRol = (roles) => (request, response, next) => {
   try {
    const { user } = request;
    const rolesByUser = user.role;

    const checkValueRol = roles.some((rol) => rolesByUser.includes(rol));

    if (!checkValueRol) {
        handleHttpError(response, 'User does not have permissions', 403);
        return;
    } 

    next();
   } catch (error) {
    handleHttpError(response, 'Permissions error', 403);
   }

};

module.exports = checkRol;
