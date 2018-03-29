'use strict';

const EventEmitter = require('events').EventEmitter;
const project = require('./project');

const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

function Add(repository) {
    this.repository = repository;

    this.execute = (data) => {
        return this.repository.add(project.create(data))
            .then((project) => {
                this.emit(SUCCESS, project);
            })
            .catch((err) => {
                this.emit(ERROR, {
                    error: err,
                    message: 'Error to add new project',
                });
            });
    };
}

Add.prototype.__proto__ = EventEmitter.prototype;
module.exports = Add;
