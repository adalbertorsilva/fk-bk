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
        update: (id, project) => {
            return db
                    .connection()
                    .collection('projects')
                    .findOneAndUpdate(
                        {'_id': db.objectId(id)},
                        {$set: project},
                        {returnOriginal: false}
                    )
                    .then((result) => result.value);
        },
    };
};
