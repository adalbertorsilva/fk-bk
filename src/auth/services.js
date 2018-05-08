'use strict';
const jwt = require('jwt-simple');
const config = require('../config/config');
const User = require('./user');
const error = require('./error');
const schema = require('./schema');
const {isEmpty, isValidEmail} = require('../common/validation');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

const register = (repository, event) => (data) => {
    const user = new User(data);
    if (!user.isValid()) {
        event.emit(ERROR, error.validation());
        return;
    }

    return repository.create(user, schema)
        .then((user) => {
            event.emit(SUCCESS, user);
        })
        .catch((err) => {
            event.emit(ERROR, error.register());
        });
};

const login = (repository, event) => (email, password) => {
    if (!isValidEmail(email) && isEmpty(password)) {
        event.emit(ERROR, error.loginValidation());
        return;
    }

    return repository.findByEmailAndPassword(email, password)
        .then((user) => {
            if (!user) {
                event.emit(ERROR, error.notFound());
                return;
            }

            const payload = {_id: user._id};
            event.emit(SUCCESS, {
                token: jwt.encode(payload, config.jwtSecret),
            });
        })
        .catch((err) => {
            console.log(err);
            event.emit(ERROR, error.register());
        });
};

module.exports = {
    login: login,
    register: register,
};
