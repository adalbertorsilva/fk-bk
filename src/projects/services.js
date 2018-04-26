'use strict';
const Project = require('./project');
const Timestamp = require('../common/timestamp');
const [SUCCESS, ERROR, NOT_FOUND] = ['SUCCESS', 'ERROR', 'NOT_FOUND'];
const error = require('./error');

const all = (repository, event) => () => {
    return repository.all()
        .then((projects) => {
            event.emit(SUCCESS, projects);
        })
        .catch((err) => {
            event.emit(ERROR, error.list(err));
        });
};

const create = (repository, event) => (data) => {
    return repository.add(new Project(data))
        .then((project) => {
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, error.create(err));
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
            if (project == null) {
                event.emit(NOT_FOUND, error.notFound(id));
                return;
            }
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, error.update(err));
        });
};

const get = (repository, event) => (id) => {
    return repository.one(id)
        .then((project) => {
            if (project == null) {
                event.emit(NOT_FOUND, error.notFound(id));
                return;
            }
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, error.get(err));
        });
};

module.exports = {
    all: all,
    create: create,
    update: update,
    get: get,
};
