'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

module.exports = (() => {
    let _db;

    return {
        connect: async (callback) => {
            try {
                const db = await MongoClient.connect(config.database.host);
                _db = db.db(config.database.name);
                if (callback) {
                    callback();
                }
            } catch (err) {
                console.log(err);
            }
        },
        connection: () => {
            return _db;
        },
        close: () => {
            _db.close();
        },
    };
})();
