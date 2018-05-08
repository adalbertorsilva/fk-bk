'use strict';

const {isValidEmail} = require('../common/validation');

class Email {
    constructor(email) {
        this.email = email;
    }

    isValid() {
        return isValidEmail(this.email);
    }
}

module.exports = Email;
