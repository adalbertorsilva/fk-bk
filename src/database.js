'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('./config');

module.exports = (() => {
    let _db;

    return {
        connect: async (callback) => {
            try {
                const db = await MongoClient.connect(config.database);
                _db = db.db();
                if (callback) {
                    callback();
                }
                return _db;
            } catch (err) {
                throw new Error('Error at connected to database');
            }
        },
        connection: () => {
            return _db;
        },
        close: () => {
            _db.close();
        },
        objectId: (id) => {
            return new ObjectID(id);
        },
        collection: (name) => {
            return _db.collection(name);
        },
    };
})();
