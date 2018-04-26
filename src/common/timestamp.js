'use strict';

class Timestamp {
    constructor({createdAt = Date.now(), updatedAt = Date.now()} = {}) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Timestamp;
