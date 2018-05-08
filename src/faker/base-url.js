'use strict';

const db = require('../db/database');

const PATTERN = /^((\d|\w)+\/)+$/;

class BaseUrl {
    constructor(baseUrl) {
        this.baseUrl = `${db.objectId()}/${baseUrl}`;
    }

    isValid() {
        return PATTERN.test(this.baseUrl);
    }
}

module.exports = BaseUrl;
