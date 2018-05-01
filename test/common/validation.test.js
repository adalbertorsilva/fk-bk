const {isEmpty, isNotEmpty} = require('../../src/common/validation');

describe('isEmpty', () => {
    test('should return true if is undefine', () => {
        const value = undefined;
        expect(isEmpty(value)).toBeTruthy();
    });
    test('should return true if is null', () => {
        const value = null;
        expect(isEmpty(value)).toBeTruthy();
    });
    test('should return true if is empty string', () => {
        const value = '';
        expect(isEmpty(value)).toBeTruthy();
    });
});

describe('isNotEmpty', () => {
    test('should return false if is undefine', () => {
        const value = undefined;
        expect(isNotEmpty(value)).toBeFalsy();
    });
    test('should return false if is null', () => {
        const value = null;
        expect(isNotEmpty(value)).toBeFalsy();
    });
    test('should return false if is empty string', () => {
        const value = '';
        expect(isNotEmpty(value)).toBeFalsy();
    });
});
