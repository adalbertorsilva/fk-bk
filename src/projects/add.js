'use strict';

const Project = require('./project');

module.exports = (repository) => (data) => {
    const project = new Project(data);
    return repository.add(project);
};
