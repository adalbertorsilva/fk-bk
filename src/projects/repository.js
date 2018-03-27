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
    };
};
