'use strict';


const PATTERN = /^(\d|\w|\.|-|_)+\@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

class Email {
    constructor(email) {
        this.email = email;
    }

    isValid() {
        return this.email !== null
            && this.email !== undefined
            && this.email !== ''
            && PATTERN.test(this.email);
    }
}

module.exports = Email;