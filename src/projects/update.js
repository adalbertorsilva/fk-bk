'use strict';

const Project = require('./project');

module.exports = (repository) => (id, data) => {
    const project = new Project(data);
    return repository.update(id, project);
};
