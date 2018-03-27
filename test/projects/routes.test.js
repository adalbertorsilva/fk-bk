'use strict';

const request = require('supertest');
const database = require('../../src/database');
const app = require('../../src/app');

beforeAll(async () => {
    await database.connect();
    await database.connection().collection('projects').remove({});
});

afterAll(() => {
    database.close();
});

test('create a new project', () => {
    return request(app.callback())
        .post('/projects')
        .send({
            name: 'foo project',
            description: 'bar description',
        })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('description');
        });
});
