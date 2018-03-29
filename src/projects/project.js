'use strict';

module.exports = (() => {
    return {
        create: ({name, description}) => {
            return {
                name: name,
                description: description,
            };
        },
    };
})();
