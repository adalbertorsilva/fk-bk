const isEmpty = (value) => value === undefined || value == null || value === '';

const isNotEmpty = (value) => !isEmpty(value);

module.exports = {
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty,
};
