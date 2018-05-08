'use strict';

const repository = (model, db) => {
    const create = (data, map) => {
            return db
                .collection(model)
                .insertOne(map(data))
                .then((response) => response.ops[0]);
    };

    const findAll = (sort) => {
        return db
                .collection(model)
                .find({}).sort(sort)
                .toArray();
    };

    const findOne = (id) => {
        return db
                .collection(model)
                .findOne({_id: db.objectId(id)});
    };

    const update = (id, data, map) => {
        delete data._id;
            return db
                .collection(model)
                .findOneAndUpdate(
                    {'_id': db.objectId(id)},
                    {$set: map(data)},
                    {returnOriginal: false}
                )
                .then((result) => result.value);
    };

    const remove = (id) => {
        return db
                .collection(model)
                .remove({_id: db.objectId(id)})
                .then((result) => result.result.n);
    };
    return {
        create: create,
        findOne: findOne,
        findAll: findAll,
        update: update,
        remove: remove,
    };
};

module.exports = repository;
