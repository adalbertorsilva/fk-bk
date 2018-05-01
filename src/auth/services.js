'use strict';
const User = require('./user');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];
const error = require('./error');

const register = (repository, event) => (data) => {
    const user = new User(data);
    if (!user.isValid()) {
        event.emit(ERROR, error.validation());
        return;
    }

    return repository.add(user)
        .then((user) => {
            event.emit(SUCCESS, user);
        })
        .catch((err) => {
            event.emit(ERROR, error.register());
        });
};

module.exports = {
    register: register,
};
