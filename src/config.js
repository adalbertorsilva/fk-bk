const config = {
    develop: {
        port: 3000,
        database: 'mongodb://mongo:27017/mystique-develop',
        jwtSecret: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    },
    test: {
        port: 3000,
        database: 'mongodb://localhost:27017/mystique-test',
        jwtSecret: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    },
    production: {
        port: 3000,
        database: process.env.MONGODB_URI,
        jwtSecret: process.env.JWT_SECRET,
    },
};
const environment = process.env.NODE_ENV || 'develop';
module.exports = config[environment];
