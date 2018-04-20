'use strict';

const EventEmitter = require('events').EventEmitter;
const Project = require('./project');

const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

class AddProjectService extends EventEmitter {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    execute(data) {
        return this.repository.add(new Project(data))
            .then((project) => {
                this.emit(SUCCESS, project);
            })
            .catch((err) => {
                this.emit(ERROR, {
                    error: err,
                    message: 'Error to add new project',
                });
            });
    }
}

module.exports = AddProjectService;
