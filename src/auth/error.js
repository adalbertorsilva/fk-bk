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

    loginValidation: () => {
        return {
            code: 403,
            error: 'Validation error',
            message: 'Email and password is required',
        };
    },


    notFound: () => {
        return {
            code: 404,
            error: 'Not Found',
            message: 'User not found',
        };
    },
};
