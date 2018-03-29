'use strict';

const EventEmitter = require('events').EventEmitter;
const project = require('./project');

const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

function Update(repository) {
    this.repository = repository;

    this.execute = (id, data) => {
        return this.repository.update(id, project.create(data))
            .then((project) => {
                this.emit(SUCCESS, project);
            })
            .catch((err) => {
                this.emit(ERROR, {
                    error: err,
                    message: 'Error to update project',
                });
            });
    };
}

Update.prototype.__proto__ = EventEmitter.prototype;
module.exports = Update;
