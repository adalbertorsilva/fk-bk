'use strict';
const Project = require('./project');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];
const error = require('./error');

const all = (repository, event) => () => {
    return repository.all()
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

    return repository.add(project)
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
    return repository.update(id, project)
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
    return repository.one(id)
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
    return repository.del(id)
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
