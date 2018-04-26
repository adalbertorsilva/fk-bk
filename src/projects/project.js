'use strict';

const Entity = require('../common/entity');
const Timestamp = require('../common/timestamp');

class Project extends Entity {
    constructor({name, description}, timestamp = new Timestamp()) {
        super();
        this.name = name;
        this.description = description;
        this.timestamp = timestamp;
    }

    isValid() {
        return this.name != null && this.name !== '' && this.name != undefined;
    }

    renewUpdatedAt() {
        this.timestamp = new Timestamp({
            createdAt: this.createdAt,
            updatedAt: Date.now(),
        });
    }
}

module.exports = Project;
