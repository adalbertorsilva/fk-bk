'use strict';

const EMAIL_PATTERN = /^(\d|\w|\.|-|_)+\@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

const request = require('supertest');
const testCase = require('../test-case');
const app = require('../../src/app');

beforeAll(async () => {
    await testCase.init();
});

beforeEach(async () => {
    await testCase.clear('users');
});

test('#POST create a new user', () => {
    return request(app.callback())
        .post('/register')
        .send({
            username: 'foo bar',
            email: 'foo@bar.com',
            password: 'secret_key',
        })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('username', 'foo bar');
            expect(res.body.email).toMatch(EMAIL_PATTERN);
            expect(res.body).toHaveProperty('password', 'secret_key');
            expect(res.body.timestamp).toHaveProperty('createdAt');
            expect(res.body.timestamp).toHaveProperty('updatedAt');
        });
});

test('#POST invalid user should return error validation', () => {
    return request(app.callback())
        .post('/register')
        .send({
            username: '',
            email: 'foo@bar',
            password: '',
        })
        .then((res) => {
            expect(res.status).toBe(403);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('code', 403);
            expect(res.body).toHaveProperty('error', 'Validation error');
            expect(res.body).toHaveProperty('message',
                 'username, email and password is required');
        });
});

test('#POST should return valid jwt token', () => {
    return testCase.makeJwtToken().then((jwtToken) => {
        return request(app.callback())
            .post('/login')
            .send(testCase.authUser())
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.type).toBe('application/json');
                expect(res.body).toHaveProperty('token', jwtToken.slice(7));
            });
    });
});

test('#POST should return user not found', () => {
    return request(app.callback())
        .post('/login')
        .send({
            email: 'foo@bar.com',
            password: 'secret_key',
        })
        .then((res) => {
            expect(res.status).toBe(404);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('code', 404);
            expect(res.body).toHaveProperty('error', 'Not Found');
            expect(res.body).toHaveProperty('message', 'User not found');
        });
});

test('#POST should return validation error', () => {
    return request(app.callback())
        .post('/login')
        .send({
            email: '',
            password: '',
        })
        .then((res) => {
            expect(res.status).toBe(403);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('code', 403);
            expect(res.body).toHaveProperty('error', 'Validation error');
            expect(res.body).toHaveProperty('message', 'Email and password is required');
        });
});


afterAll(() => {
    testCase.finished();
});
