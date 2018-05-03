const EMAIL_PATTERN = /^(\d|\w|\.|-|_)+\@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

const isEmpty = (value) => value === undefined || value == null || value === '';

const isNotEmpty = (value) => !isEmpty(value);

const isValidEmail = (email) => EMAIL_PATTERN.test(email);

module.exports = {
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty,
    isValidEmail: isValidEmail,
};
