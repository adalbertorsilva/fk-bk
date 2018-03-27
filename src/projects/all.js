'use strict';

module.exports = (repository) => () => {
    return repository.all();
};
