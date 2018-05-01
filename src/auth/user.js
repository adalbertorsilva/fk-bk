'use strict';

const Entity = require('../common/entity');
const Timestamp = require('../common/timestamp');
const Email = require('../common/email');

class User extends Entity {
    constructor({_id, username, email, password}, timestamp = new Timestamp()) {
        super(_id);
        this.username = username;
        this.email = new Email(email);
        this.password = password;
        this.timestamp = timestamp;
    }

    isValid() {
        return this.username != null
            && this.username !== ''
            && this.username != undefined
            && this.email.isValid()
            && this.password != null
            && this.password !== ''
            && this.password != undefined;
    }
}

module.exports = User;
