const Project = require('../../src/projects/project');

describe('isValid', () => {
    test('should return false if is invalid project', () => {
        const project = new Project({
            name: '',
            baseUrl: '/api/v1/',
        });

        expect(project.isValid()).toBeFalsy();
    });
    test('should return true if is valid project', () => {
        const project = new Project({
            name: 'foo name',
            baseUrl: 'api/v1/',
        });

        expect(project.isValid()).toBeTruthy();
    });
});
