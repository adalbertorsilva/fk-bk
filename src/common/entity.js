'use strict';

class Entity {
    constructor(_id = 0) {
        this._id = _id;
    }

    equals(entity) {
        return this._id === entity._id;
    }
}

module.exports = Entity;
