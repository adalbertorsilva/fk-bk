'use strict';
const jwt = require('jwt-simple');
const config = require('../config');
const User = require('./user');
const Email = require('../common/email');
const {isEmpty} = require('../common/validation');
const error = require('./error');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

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

const login = (repository, event) => (email, password) => {
    if (!(new Email(email)).isValid() && isEmpty(password)) {
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
