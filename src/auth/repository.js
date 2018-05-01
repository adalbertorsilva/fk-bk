'use strict';

module.exports = (db) => {
    function toDatabase(user) {
        return {
            username: user.username,
            email: user.email.email,
            password: user.password,
            timestamp: user.timestamp,
        };
    }

    return {
        add: (user) => {
            delete user._id;
            return db
                .collection('users')
                .insertOne(toDatabase(user))
                .then((response) => response.ops[0]);
        },
    };
};
