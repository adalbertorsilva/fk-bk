'use strict';
const Project = require('./project');
const Timestamp = require('../common/timestamp');
const [SUCCESS, ERROR, NOT_FOUND] = ['SUCCESS', 'ERROR', 'NOT_FOUND'];

const all = (repository, event) => () => {
    return repository.all()
        .then((projects) => {
            event.emit(SUCCESS, projects);
        })
        .catch((err) => {
            event.emit(ERROR, {
                error: err,
                message: 'Error to list all projects',
            });
        });
};

const create = (repository, event) => (data) => {
    return repository.add(new Project(data))
        .then((project) => {
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, {
                error: err,
                message: 'Error to add new project',
            });
        });
};

const update = (repository, event) => (id, data) => {
    const timestamp = new Timestamp({
        createdAt: data.timestamp.createdAt,
        updatedAt: Date.now(),
    });
    data.timestamp = timestamp;
    const project = new Project(data);

    return repository.update(id, project)
        .then((project) => {
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, {
                error: err,
                message: 'Error to update project',
            });
        });
};

const get = (repository, event) => (id) => {
    return repository.one(id)
        .then((project) => {
            if (project == null) {
                event.emit(NOT_FOUND, {
                    error: `Project with ${id} was not found`,
                    message: 'Project not found',
                });
                return;
            }
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, {
                error: err,
                message: 'Error to get project',
            });
        });
};

module.exports = {
    all: all,
    create: create,
    update: update,
    get: get,
};
