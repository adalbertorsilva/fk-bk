const config = {
    develop: {
        port: 3000,
        database: {
            name: 'mystique-develop',
            host: 'mongodb://localhost:27017',
        },
    },
    test: {
        port: 3000,
        database: {
            name: 'mystique-test',
            host: 'mongodb://localhost:27017',
        },
    },
    prod: {
        port: 3000,
        database: {
            name: 'mystique-prod',
            host: 'mongodb://localhost:27017',
        },
    },
};
const environment = process.env.NODE_ENV || 'develop';
module.exports = config[environment];
