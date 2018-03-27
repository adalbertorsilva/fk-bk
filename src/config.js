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
    production: {
        port: 3000,
        database: {
            name: 'mystique-prod',
            host: process.env.MONGODB_URI,
        },
    },
};
const environment = process.env.NODE_ENV || 'develop';
module.exports = config[environment];
