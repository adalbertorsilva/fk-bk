'use strict';

const EventEmitter = require('events').EventEmitter;

const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

class AllProjectService extends EventEmitter {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    execute(data) {
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
    }
}

module.exports = AllProjectService;

