'use strict';

class Entity {
    constructor() {
        this._id = 0;
    }

    equals(entity) {
        return this._id === entity._id;
    }
}

module.exports = Entity;
