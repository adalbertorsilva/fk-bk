'use strict';

const Entity = require('../common/entity');
const Timestamp = require('../common/timestamp');
const Email = require('./email');
const {isNotEmpty} = require('../common/validation');

class User extends Entity {
    constructor({_id, username, email, password}, timestamp = new Timestamp()) {
        super(_id);
        this.username = username;
        this.email = new Email(email);
        this.password = password;
        this.timestamp = timestamp;
    }

    isValid() {
        return isNotEmpty(this.username)
            && this.email.isValid()
            && isNotEmpty(this.password);
    }
}

module.exports = User;
