'use strict';

module.exports = (db) => {
    return {
        add: (project) => {
            delete project._id;
            return db
                .collection('projects')
                .insertOne(project)
                .then((response) => response.ops[0]);
        },
        all: () => {
            return db
                .collection('projects')
                .find({}).sort({name: 1})
                .toArray();
        },
        update: (id, project) => {
            delete project._id;
            return db
                .collection('projects')
                .findOneAndUpdate(
                    {'_id': db.objectId(id)},
                    {$set: project},
                    {returnOriginal: false}
                )
                .then((result) => result.value);
        },
        one: (id) => {
            return db
                .collection('projects')
                .findOne({_id: db.objectId(id)});
        },
        del: (id) => {
            return db
                .collection('projects')
                .remove({_id: db.objectId(id)})
                .then((result) => result.result.n);
        },
    };
};
