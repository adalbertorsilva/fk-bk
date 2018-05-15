'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('../config/config');
const createIndexes = require('./indexes');

let _db;

function connectToDb() {
    return MongoClient.connect(config.database)
        .then((db) => db.db())
        .then((db) => {
            _db = db;
            createIndexes(db);
        }).catch((err) => console.error('Error at connected to database', err));
}

function getConnection() {
    return _db;
}

function closeConnection() {
    return _db.close();
}

function makeObjectId(id) {
    return new ObjectID(id);
}

function getCollection(name) {
    return _db.collection(name);
}

module.exports = (() => {
    return {
        connect: connectToDb,
        connection: getConnection,
        collection: getCollection,
        close: closeConnection,
        objectId: makeObjectId,
        collection: getCollection,
    };
})();


