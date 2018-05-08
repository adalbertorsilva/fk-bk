'use strict';

const USERS = 'users';

const repository = (db) => {
    const findByEmailAndPassword = (email, password) => {
        return db
            .collection(USERS)
            .findOne({email: email, password: password});
    };

    return {
        findByEmailAndPassword: findByEmailAndPassword,
    };
};

module.exports = repository;
