'use strict';

module.exports = (db) => {
    return {
        add: (project) => {
            return db
                .connection()
                .collection('projects')
                .insertOne(project)
                .then((response) => response.ops[0]);
        },
        all: () => {
            return db
                .connection()
                .collection('projects')
                .find({})
                .toArray();
        },
    };
};
