'use strict';

const EMAIL_PATTERN = /^(\d|\w|\.|-|_)+\@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

const request = require('supertest');
const testCase = require('../test-case');
const app = require('../../src/app');
let users;

const USER = {
    username: 'foo bar',
    email: 'foo@bar.com',
    password: 'secret_key',
};

beforeAll(async () => {
    await testCase.init();
    users = testCase.makeModel('users');
});

beforeEach(async () => {
    await testCase.clear('users');
});

test('#POST create a new user', async () => {
    const res = await request(app.callback()).post('/register').send(USER);
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('username', 'foo bar');
    expect(res.body.email).toMatch(EMAIL_PATTERN);
    expect(res.body).toHaveProperty('password', 'secret_key');
    expect(res.body.timestamp).toHaveProperty('createdAt');
    expect(res.body.timestamp).toHaveProperty('updatedAt');
});

test('#POST invalid user should return error validation', async () => {
    const payload = {
        username: '',
        email: 'foo@bar',
        password: '',
    };
    const res = await request(app.callback()).post('/register').send(payload);
    expect(res.status).toBe(403);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('code', 403);
    expect(res.body).toHaveProperty('error', 'Validation error');
    expect(res.body).toHaveProperty('message',
    'username, email and password is required');
});

test('#POST the email do not should repeat', async () => {
    await users.insertOne(USER);
    const res = await request(app.callback()).post('/register').send(USER);
    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('code', 400);
    expect(res.body).toHaveProperty('error', 'Bad Request');
    expect(res.body).toHaveProperty('message',
        'Error to register user, email should be unique');
});

test('#POST should return valid jwt token', async () => {
    const jwtToken = await testCase.makeJwtToken();
    const res = await request(app.callback()).post('/login')
        .send(testCase.authUser());

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('token', jwtToken.slice(7));
});

test('#POST should return user not found', async () => {
    const res = await request(app.callback()).post('/login').send(USER);

    expect(res.status).toBe(404);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('code', 404);
    expect(res.body).toHaveProperty('error', 'Not Found');
    expect(res.body).toHaveProperty('message', 'User not found');
});

test('#POST should return validation error', async () => {
    const payload = {
        email: '',
        password: '',
    };

    const res = await request(app.callback()).post('/login').send(payload);
    expect(res.status).toBe(403);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('code', 403);
    expect(res.body).toHaveProperty('error', 'Validation error');
    expect(res.body).toHaveProperty('message',
     'Email and password is required');
});


afterAll(() => {
    testCase.finished();
});
