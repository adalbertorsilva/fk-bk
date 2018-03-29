'use strict';

const request = require('supertest');
const database = require('../../src/database');
const app = require('../../src/app');
let projects;

beforeAll(async () => {
    await database.connect();
});

beforeEach(async () => {
    projects = database.connection().collection('projects');
    await projects.remove({});
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

test('list all projects', () => {
    return projects.insertMany([{
            name: 'foo 1',
            description: 'bar',
        },
        {
            name: 'foo 2',
            description: 'bar',
        },
    ]).then((result) => {
        return request(app.callback())
            .get('/projects')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.type).toBe('application/json');
                expect(res.body).toHaveLength(2);
            });
    });
});

test('update project', () => {
    return projects.insertOne({
            name: 'foo',
            description: 'bar',
        })
        .then((result) => result.ops[0])
        .then((result) => {
            return request(app.callback())
                .put(`/projects/${result._id}`)
                .send({
                    name: 'bar',
                    description: 'foo',
                })
                .then((res) => {
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('name', 'bar');
                    expect(res.body).toHaveProperty('description', 'foo');
                });
        });
});

afterAll(() => {
    database.close();
});
