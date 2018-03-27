const config = {
    develop: {
        port: 3000,
        database: 'mongodb://localhost:27017/mystique-develop',
    },
    test: {
        port: 3000,
        database: 'mongodb://localhost:27017/mystique-test',
    },
    production: {
        port: 3000,
        database: process.env.MONGODB_URI,
    },
};
const environment = process.env.NODE_ENV || 'develop';
module.exports = config[environment];
