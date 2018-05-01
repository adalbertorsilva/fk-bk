const User = require('../../src/auth/user');

describe('isValid', () => {
    test('should return false if is invalid user', () => {
        const user = new User({
            username: '',
            password: '',
            email: 'foo@bar',
        });

        expect(user.isValid()).toBeFalsy();
    });
    test('should return true if is valid user', () => {
        const user = new User({
            username: 'foo name',
            password: 'secret-key',
            email: 'foo.bar@lol.com.zd',
        });

        expect(user.isValid()).toBeTruthy();
    });
});
