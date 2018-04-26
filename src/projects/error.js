module.exports = {

    notFound: (id) => {
        return {
            error: `Project with ${id} was not found`,
            message: 'Project not found',
        };
    },

    list: (err) => {
        return {
            error: err,
            message: 'Error to list all projects',
        };
    },

    create: (err) => {
        return {
            error: err,
            message: 'Error to add new project',
        };
    },

    update: (err) => {
        return {
            error: err,
            message: 'Error to update project',
        };
    },

    get: (err) => {
        return {
            error: err,
            message: 'Error to get project',
        };
    },

};
