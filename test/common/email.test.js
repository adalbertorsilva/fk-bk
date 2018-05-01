const Email = require('../../src/common/email');

describe('isValid', () => {
    test('should return true if is valid email', () => {
        const email = new Email('test@valid.com');
        expect(email.isValid()).toBeTruthy();
    });
    test('should return false if is invalid email', () => {
        const email = new Email('test@invalid');
        expect(email.isValid()).toBeFalsy();
    });
    test('should return false if is empty email', () => {
        const email = new Email('');
        expect(email.isValid()).toBeFalsy();
    });
});
