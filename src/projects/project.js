'use strict';

const Entity = require('../common/entity');
const Timestamp = require('../common/timestamp');
const BaseUrl = require('../common/base-url');

class Project extends Entity {
    constructor({_id, name, baseUrl}, timestamp = new Timestamp()) {
        super(_id);
        this.name = name;
        this.baseUrl = new BaseUrl('https', `${Date.now()}/${baseUrl}`);
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
