'use strict';

const request = require('supertest');
const database = require('../../src/database');
const app = require('../../src/app');
let users;

const EMAIL_PATTERN = /^[a-z0-9]+\@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

beforeAll(async () => {
    await database.connect();
});

beforeEach(async () => {
    users = database.connection().collection('users');
    await users.remove({});
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

afterAll(() => {
    database.close();
});
