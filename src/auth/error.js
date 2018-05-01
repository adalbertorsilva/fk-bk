module.exports = {
    register: () => {
        return {
            code: 500,
            error: 'Server Error',
            message: 'Error to register user',
        };
    },

    validation: () => {
        return {
            code: 403,
            error: 'Validation error',
            message: 'username, email and password is required',
        };
    },
};
