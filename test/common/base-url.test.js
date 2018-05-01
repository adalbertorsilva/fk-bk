const BaseUrl = require('../../src/common/base-url');

describe('isValid', () => {
    test('should return true if is valid base url', () => {
        const baseUrl = new BaseUrl('api/v1/');
        expect(baseUrl.isValid()).toBeTruthy();
    });
    test('should return false if is invalid base url', () => {
        const baseUrl = new BaseUrl('/api/v1');
        expect(baseUrl.isValid()).toBeFalsy();
    });
});
