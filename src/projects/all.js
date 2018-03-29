'use strict';

const EventEmitter = require('events').EventEmitter;

const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

function All(repository) {
    this.repository = repository;

    this.execute = () => {
        return this.repository.all()
            .then((projects) => {
                this.emit(SUCCESS, projects);
            })
            .catch((err) => {
                this.emit(ERROR, {
                    error: err,
                    message: 'Error to list all projects',
                });
            });
    };
}

All.prototype.__proto__ = EventEmitter.prototype;
module.exports = All;
