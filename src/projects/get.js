'use strict';

const EventEmitter = require('events').EventEmitter;

const [SUCCESS, ERROR, NOT_FOUND] = ['SUCCESS', 'ERROR', 'NOT_FOUND'];

class GetProjectService extends EventEmitter {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    execute(id) {
        return this.repository.one(id)
            .then((project) => {
                if (project == null) {
                    this.emit(NOT_FOUND, {
                        error: `Project with ${id} was not found`,
                        message: 'Project not found',
                    });
                    return;
                }
                this.emit(SUCCESS, project);
            })
            .catch((err) => {
                this.emit(ERROR, {
                    error: err,
                    message: 'Error to get project',
                });
            });
    }
}

module.exports = GetProjectService;

