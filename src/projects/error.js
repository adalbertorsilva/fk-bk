module.exports = {

    notFound: (id) => {
        return {
            code: 404,
            error: 'Project not found',
            message: `Project with ${id} was not found`,
        };
    },

    list: () => {
        return {
            code: 500,
            error: 'Server Error',
            message: 'Error to list all projects',
        };
    },

    create: () => {
        return {
            code: 500,
            error: 'Server Error',
            message: 'Error to add new project',
        };
    },

    update: () => {
        return {
            code: 500,
            error: 'Server Error',
            message: 'Error to update project',
        };
    },

    get: () => {
        return {
            code: 500,
            error: 'Server Error',
            message: 'Error to get project',
        };
    },

    validation: () => {
        return {
            code: 403,
            error: 'Validation error',
            message: 'Your project must have a name',
        };
    },
};