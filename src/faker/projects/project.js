'use strict';

const Entity = require('../../common/entity');
const Timestamp = require('../../common/timestamp');
const BaseUrl = require('../base-url');
const {isNotEmpty} = require('../../common/validation');

class Project extends Entity {
    constructor({_id, name, baseUrl}, timestamp = new Timestamp()) {
        super(_id);
        this.name = name;
        this.baseUrl = new BaseUrl(baseUrl);
        this.timestamp = timestamp;
    }

    isValid() {
        return isNotEmpty(this.name)
            && this.baseUrl.isValid();
    }

    renewUpdatedAt() {
        this.timestamp = new Timestamp({
            createdAt: this.createdAt,
            updatedAt: Date.now(),
        });
    }
}

module.exports = Project;
