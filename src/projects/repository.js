'use strict';
module.exports = (db) => {
    const projectCollection = db
            .connection()
            .collection('projects');

    return {
        add: (project) => {
            return projectCollection
                .insertOne(project)
                .then((response) => response.ops[0]);
        },
        all: () => {
            return projectCollection
                .find({})
                .toArray();
        },
        update: (id, project) => {
            return projectCollection
                    .findOneAndUpdate(
                        {'_id': db.objectId(id)},
                        {$set: project},
                        {returnOriginal: false}
                    )
                    .then((result) => result.value);
        },
    };
};
