'use strict';

const EventEmitter = require('events').EventEmitter;
const Project = require('./project');
const Timestamp = require('../common/timestamp');

const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

class UpdateProjectService extends EventEmitter {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    execute(id, data) {
        const timestamp = new Timestamp(data.timestamp.createdAt, Date.now());
        const project = new Project(data, timestamp);
        return this.repository.update(id, project)
        .then((project) => {
            this.emit(SUCCESS, project);
        })
        .catch((err) => {
            console.log(err);
            this.emit(ERROR, {
                error: err,
                message: 'Error to update project',
            });
        });
    }
}

module.exports = UpdateProjectService;
