'use strict';
const Project = require('./project');
const error = require('./error');
const schema = require('./schema');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

const all = (repository, event) => () => {
    return repository.findAll({name: 1})
        .then((projects) => {
            event.emit(SUCCESS, projects);
        })
        .catch((err) => {
            event.emit(ERROR, error.list());
        });
};

const create = (repository, event) => (data) => {
    const project = new Project(data);
    if (!project.isValid()) {
        event.emit(ERROR, error.validation());
        return;
    }

    return repository.create(project, schema)
        .then((project) => {
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, error.create());
        });
};

const update = (repository, event) => (id, data) => {
    const project = new Project(data);
    if (!project.isValid()) {
        event.emit(ERROR, error.validation());
        return;
    }

    project.renewUpdatedAt();
    return repository.update(id, project, schema)
        .then((project) => {
            if (project == null) {
                event.emit(ERROR, error.notFound(id));
                return;
            }
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, error.update());
        });
};

const get = (repository, event) => (id) => {
    return repository.findOne(id)
        .then((project) => {
            if (project == null) {
                event.emit(ERROR, error.notFound(id));
                return;
            }
            event.emit(SUCCESS, project);
        })
        .catch((err) => {
            event.emit(ERROR, error.get());
        });
};

const del = (repository, event) => (id) => {
    return repository.remove(id)
        .then((success) => {
            if (!success) {
                event.emit(ERROR, error.notFound(id));
                return;
            }
            event.emit(SUCCESS);
        })
        .catch((err) => {
            event.emit(ERROR, error.del());
        });
};

module.exports = {
    all: all,
    create: create,
    update: update,
    get: get,
    del: del,
};
